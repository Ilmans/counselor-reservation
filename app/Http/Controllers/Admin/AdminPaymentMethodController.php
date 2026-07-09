<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\PaymentMethodResource;
use App\Models\PaymentMethod;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class AdminPaymentMethodController extends Controller
{
    public function index(Request $request)
    {
        $filters = $request->only('search');

        $paymentMethods = PaymentMethodResource::collection(
            PaymentMethod::query()
                ->when($request->search, fn($q) => $q->where('name', 'like', "%{$request->search}%"))
                ->orderBy('name')
                ->paginate(10)
                ->withQueryString()
        );

        return inertia('Admin/payment-method/index', compact('paymentMethods', 'filters'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' => ['required', 'string', 'max:255', Rule::unique('payment_methods', 'code')],
            'name' => ['required', 'string', 'max:255'],
            'type' => ['required', 'in:bank_transfer,ewallet,qris,virtual_account'],
            'is_active' => ['boolean'],
            'metadata.logo' => ['nullable', 'string'],
            'metadata.account_name' => ['nullable', 'string'],
            'metadata.account_number' => ['nullable', 'string'],
            'metadata.qr_image' => ['nullable', 'string'],
            'metadata.merchant_name' => ['nullable', 'string'],
        ]);

        PaymentMethod::create($validated);

        return redirect()->back()->with('toast', [
            'type' => 'success',
            'message' => 'Metode pembayaran berhasil ditambahkan.',
        ]);
    }

    public function update(Request $request, PaymentMethod $paymentMethod)
    {
        $validated = $request->validate([
            'code' => ['required', 'string', 'max:255', Rule::unique('payment_methods', 'code')->ignore($paymentMethod->id)],
            'name' => ['required', 'string', 'max:255'],
            'type' => ['required', 'in:bank_transfer,ewallet,qris,virtual_account'],
            'is_active' => ['boolean'],
            'metadata.logo' => ['nullable', 'string'],
            'metadata.account_name' => ['nullable', 'string'],
            'metadata.account_number' => ['nullable', 'string'],
            'metadata.qr_image' => ['nullable', 'string'],
            'metadata.merchant_name' => ['nullable', 'string'],
        ]);

        $paymentMethod->update($validated);

        return redirect()->back()->with('toast', [
            'type' => 'success',
            'message' => 'Metode pembayaran berhasil diperbarui.',
        ]);
    }

    public function delete(PaymentMethod $paymentMethod)
    {
        $paymentMethod->delete();

        return redirect()->back()->with('toast', [
            'type' => 'success',
            'message' => 'Metode pembayaran berhasil dihapus.',
        ]);
    }
}
