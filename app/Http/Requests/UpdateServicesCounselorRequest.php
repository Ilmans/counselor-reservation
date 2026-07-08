<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateServicesCounselorRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'pricing_type'                => ['required', Rule::in(['free', 'paid'])],
            'price_per_hour'               => ['required_if:pricing_type,paid', 'nullable', 'min:0'],
            'session_duration_minutes'     => ['required', 'integer', 'min:15', 'max:180'],
            'specialization_id'            => ['required', 'exists:specializations,id'],
            'category_ids'                 => ['required', 'array', 'min:1', 'max:4'],
            'category_ids.*'               => ['integer', 'exists:categories,id'],
        ];
    }
}
