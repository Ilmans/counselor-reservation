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

    public function getInvoiceDetail(int $id, int $userId): array
    {
        $invoice = $this->invoiceRepository->findForUser($id, $userId);

        abort_if(!$invoice, 404);

        $this->autoExpireIfNeeded($invoice);

        return [
            'invoice'        => $this->formatInvoice($invoice),
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
            'metadata'    => $method->metadata,
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

    public function formatInvoice(Invoice $invoice): array
    {
        $consultation = $invoice->consultation;
        $counselor = $consultation->counselor;

        return [
            'id'               => $invoice->id,
            'reference'        => $invoice->reference,
            'status'           => $invoice->status,
            'amount'           => (float) $invoice->amount,
            'amount_formatted' => 'Rp ' . number_format((float) $invoice->amount, 0, ',', '.'),
            'payment_method'   => $invoice->payment_method,
            'expired_at'       => optional($invoice->expired_at)->toISOString(),
            'paid_at'          => optional($invoice->paid_at)->toISOString(),

            'consultation' => [
                'id'        => $consultation->id,
                'reference' => $consultation->reference,
                'date'      => \Carbon\Carbon::parse($consultation->consultation_date)->translatedFormat('l, j F Y'),
                'time'      => \Carbon\Carbon::parse($consultation->estimated_time)->format('H:i') . ' WIB',
                'method'    => $consultation->method,
            ],

            'counselor' => [
                'name'           => $counselor->name,
                'slug'           => $counselor->slug,
                'specialization' => $counselor->specialization->name ?? '-',
                'photo_url'      => $counselor->photo_url,
            ],
        ];
    }
}
