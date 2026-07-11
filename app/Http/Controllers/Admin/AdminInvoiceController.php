<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\InvoiceResource;
use App\Models\Invoice;
use App\Repositories\InvoiceRepository;
use Illuminate\Http\Request;

class AdminInvoiceController extends Controller
{
    public function __construct(protected InvoiceRepository $invoiceRepo) {}

    public function index(Request $request)
    {
        $filters = $request->only('status', 'search');

        $invoices = InvoiceResource::collection(
            $this->invoiceRepo->getAllInvoicesForAdmin($request->status, $request->search)
        );

        return inertia('Admin/invoice/index', compact('invoices', 'filters'));
    }

    public function markAsPaid(Invoice $invoice)
    {
        if ($invoice->status !== 'pending') {
            return redirect()->back()->with('toast', [
                'type' => 'error',
                'message' => 'Hanya invoice berstatus pending yang bisa ditandai lunas.',
            ]);
        }

        $this->invoiceRepo->markAsPaid($invoice);


        return redirect()->back()->with('toast', [
            'type' => 'success',
            'message' => 'Invoice berhasil ditandai lunas.',
        ]);
    }

    public function delete(Invoice $invoice)
    {
        $this->invoiceRepo->deleteInvoice($invoice);

        return redirect()->back()->with('toast', [
            'type' => 'success',
            'message' => 'Invoice berhasil dihapus.',
        ]);
    }
}
