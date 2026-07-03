<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Services\InvoiceService;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class InvoiceController extends Controller
{
    public function __construct(protected InvoiceService $service) {}

    public function show(Request $request, int $id)
    {
        $data = $this->service->getInvoiceDetail($id, Auth::id());
        return inertia('invoice/show', $data);
    }

    public function updatePaymentMethod(Request $request, Invoice $invoice)
    {
        abort_unless($invoice->user_id === Auth::id(), 403);
        $data = $request->validate([
            'payment_method_code' => ['required', 'string', 'exists:payment_methods,code'],
        ]);

        $updated = $this->service->selectPaymentMethod($invoice, $data['payment_method_code']);
        return response()->json([
            'message' => 'Metode pembayaran berhasil dipilih.',
            'invoice' => $this->service->formatInvoice($updated),
        ]);
    }

    public function downloadPdf(int $id)
    {
        $data = $this->service->getInvoiceDetail($id, Auth::id());
        $invoice = $data['invoice'];

        $pdf = Pdf::loadView('invoice.pdf', ['invoice' => $invoice]);

        return $pdf->download("invoice-{$invoice['reference']}.pdf");
    }
}
