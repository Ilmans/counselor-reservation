<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreCounselorRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            /*
            |--------------------------------------------------------------------------
            | Akun
            |--------------------------------------------------------------------------
            */
            'user_id' => [
                'required',
                'exists:users,id',
                'unique:counselors,user_id',
            ],

            /*
            |--------------------------------------------------------------------------
            | Profil
            |--------------------------------------------------------------------------
            */
            'name' => [
                'required',
                'string',
                'max:255',
            ],

            'specialization_id' => [
                'required',
                'exists:specializations,id',
            ],

            'experience_years' => [
                'required',
                'integer',
                'min:0',
                'max:60',
            ],

            'email' => [
                'required',
                'email',
                'max:255',
            ],

            'whatsapp' => [
                'required',
                'string',
                'max:20',
            ],

            'bio' => [
                'required',
                'string',
            ],

            'status' => [
                'required',
                Rule::in(['active', 'inactive']),
            ],

            'photo' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png',
                'max:2048',
            ],

            /*
            |--------------------------------------------------------------------------
            | Address
            |--------------------------------------------------------------------------
            */
            'address' => [
                'required',
                'array',
            ],

            'address.name' => [
                'required',
                'string',
                'max:255',
            ],

            'address.address' => [
                'required',
                'string',
            ],

            'address.city' => [
                'required',
                'string',
                'max:255',
            ],

            'address.province' => [
                'required',
                'string',
                'max:255',
            ],

            'address.postal_code' => [
                'required',
                'string',
                'max:10',
            ],

            'address.maps_url' => [
                'nullable',
                'url',
                'max:2048',
            ],

            /*
            |--------------------------------------------------------------------------
            | Layanan
            |--------------------------------------------------------------------------
            */
            'pricing_type' => [
                'required',
                Rule::in(['free', 'paid']),
            ],

            'price_per_hour' => [
                'nullable',
                'required_if:pricing_type,paid',
                'numeric',
                'min:0',
            ],

            'session_duration_minutes' => [
                'required',
                'integer',
                'min:15',
                'max:180',
            ],

            /*
            |--------------------------------------------------------------------------
            | Kategori
            |--------------------------------------------------------------------------
            */
            'category_ids' => [
                'required',
                'array',
                'min:1',
                'max:4',
            ],

            'category_ids.*' => [
                'integer',
                'distinct',
                'exists:categories,id',
            ],

            /*
            |--------------------------------------------------------------------------
            | Jadwal (opsional)
            |--------------------------------------------------------------------------
            */
            'schedules' => [
                'sometimes',
                'array',
                'size:7',
            ],

            'schedules.*.day_of_week' => [
                'required_with:schedules',
                'integer',
                'between:0,6',
                'distinct',
            ],

            'schedules.*.open_time' => [
                'required_with:schedules',
                'date_format:H:i:s',
            ],

            'schedules.*.close_time' => [
                'required_with:schedules',
                'date_format:H:i:s',
                'after:schedules.*.open_time',
            ],

            'schedules.*.method' => [
                'required_with:schedules',
                Rule::in(['online', 'offline', 'both']),
            ],

            'schedules.*.is_active' => [
                'required_with:schedules',
                'boolean',
            ],
        ];
    }
}
