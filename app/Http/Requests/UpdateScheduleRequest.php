<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateScheduleRequest extends FormRequest
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
            'schedules' => ['required', 'array', 'size:7'],
            'schedules.*.day_of_week' => ['required', 'integer', 'between:0,6', 'distinct'],
            'schedules.*.open_time' => ['required', 'date_format:H:i:s'],
            'schedules.*.close_time' => ['required', 'date_format:H:i:s', 'after:schedules.*.open_time'],
            'schedules.*.method' => ['required', 'in:online,offline,both'],
            'schedules.*.is_active' => ['required', 'boolean'],
        ];
    }
}
