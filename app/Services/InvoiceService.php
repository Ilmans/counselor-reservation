<?php

namespace App\Services;

use App\Models\Invoice;
use App\Repositories\InvoiceRepository;
use Carbon\Carbon;
use Illuminate\Validation\ValidationException;

class InvoiceService
{
    public function __construct(
        protected InvoiceRepository $invoiceRepository
    ) {}

    public function getUserInvoices(int $userId, ?string $search = null): array
    {
        $invoices = $this->invoiceRepository
            ->getUserInvoices($userId, $search);

        $invoices->getCollection()->transform(
            fn(Invoice $invoice) => $this->formatInvoiceBase($invoice)
        );

        return ['invoices' => $invoices];
    }

    public function getInvoiceDetail($ref, int $userId): array
    {
        $invoice = $this->invoiceRepository->findForUser($ref, $userId);

        abort_if(!$invoice, 404);

        $this->autoExpireIfNeeded($invoice);

        return [
            'invoice'        => $this->formatInvoiceDetail($invoice),
            'paymentMethods' => $invoice->status === 'pending'
                ? $this->invoiceRepository->getActivePaymentMethods()
                : [],
        ];
    }

    public function selectPaymentMethod(Invoice $invoice, string $code): Invoice
    {
        $this->autoExpireIfNeeded($invoice);

        if ($invoice->status !== 'pending') {
            throw ValidationException::withMessages([
                'payment_method_code' => 'Invoice ini sudah tidak bisa diubah metode pembayarannya.',
            ]);
        }

        $method = $this->invoiceRepository->findActivePaymentMethodByCode($code);

        if (!$method) {
            throw ValidationException::withMessages([
                'payment_method_code' => 'Metode pembayaran tidak tersedia.',
            ]);
        }

        $snapshot = [
            'code'        => $method->code,
            'name'        => $method->name,
            'type'        => $method->type,
            'metadata' => is_string($method->metadata)
                ? json_decode($method->metadata, true)
                : $method->metadata,
            'selected_at' => now()->toISOString(),
        ];

        return $this->invoiceRepository->updatePaymentMethod($invoice, $snapshot);
    }

    private function autoExpireIfNeeded(Invoice $invoice): void
    {
        if (
            $invoice->status === 'pending' &&
            $invoice->expired_at &&
            Carbon::parse($invoice->expired_at)->isPast()
        ) {
            $invoice->update(['status' => 'expired']);
            $invoice->refresh();
        }
    }

    /**
     * Format ringkas untuk list/table invoice.
     */
    private function formatInvoiceBase(Invoice $invoice): array
    {
        return [
            'id'        => $invoice->id,
            'reference' => $invoice->reference,
            'date'      => $invoice->created_at->translatedFormat('d M Y'),
            'amount'    => 'Rp' . number_format((float) $invoice->amount, 0, ',', '.'),
            'status'    => $invoice->status === 'paid' ? 'paid' : 'unpaid',
        ];
    }

    /**
     * Format lengkap untuk halaman detail invoice, extend dari base.
     */
    public function formatInvoiceDetail(Invoice $invoice): array
    {
        $consultation = $invoice->consultation;
        $counselor = $consultation->counselor;

        return array_merge($this->formatInvoiceBase($invoice), [
            'status'           => $invoice->status,
            'amount'           => (float) $invoice->amount,
            'amount_formatted' => 'Rp ' . number_format((float) $invoice->amount, 0, ',', '.'),
            'expired_at'       => optional($invoice->expired_at)->toISOString(),
            'paid_at'          => optional($invoice->paid_at)->toISOString(),

            'payment_method' => $invoice->payment_method ? [
                'code'     => $invoice->payment_method['code'] ?? null,
                'name'     => $invoice->payment_method['name'] ?? null,
                'type'     => $invoice->payment_method['type'] ?? null,
                'metadata' => [
                    'logo'           => $invoice->payment_method['metadata']['logo'] ?? null,
                    'account_name'   => $invoice->payment_method['metadata']['account_name'] ?? null,
                    'account_number' => $invoice->payment_method['metadata']['account_number'] ?? null,
                    'qr_image'       => $invoice->payment_method['metadata']['qr_image'] ?? null,
                    'merchant_name'  => $invoice->payment_method['metadata']['merchant_name'] ?? null,
                ],
            ] : null,

            'consultation' => [
                'id'        => $consultation->id,
                'reference' => $consultation->reference,
                'date'      => Carbon::parse($consultation->consultation_date)->translatedFormat('l, j F Y'),
                'time'      => Carbon::parse($consultation->estimated_time)->format('H:i') . ' WIB',
                'method'    => $consultation->method,
            ],

            'counselor' => [
                'name'           => $counselor->name,
                'slug'           => $counselor->slug,
                'specialization' => $counselor->specialization->name ?? '-',
                'photo_url'      => $counselor->photo_url,
            ],
        ]);
    }
}
