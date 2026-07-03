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

    public function index(Request $request)
    {
        $result = $this->service->getUserInvoices(Auth::id(), $request->input('search'));

        return inertia('invoices/index', array_merge($result, [
            'filters' => ['search' => $request->input('search')],
        ]));
    }

    public function show(Request $request,  $ref)
    {
        $data = $this->service->getInvoiceDetail($ref, Auth::id());
        return inertia('invoices/show', $data);
    }

    public function updatePaymentMethod(Invoice $invoice,Request $request)
    {

        abort_unless($invoice->user_id === Auth::id(), 403);

        $data = $request->validate([
            'payment_method_code' => ['required', 'string', 'exists:payment_methods,code'],
        ]);

        $this->service->selectPaymentMethod($invoice, $data['payment_method_code']);

        return back();
    }

    public function downloadPdf(int $id)
    {
        $data = $this->service->getInvoiceDetail($id, Auth::id());
        $invoice = $data['invoice'];

        $pdf = Pdf::loadView('invoice.pdf', ['invoice' => $invoice]);

        return $pdf->download("invoice-{$invoice['reference']}.pdf");
    }
}
