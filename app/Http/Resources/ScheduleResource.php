<?php

namespace App\Http\Resources;

use App\Support\Formatter;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ScheduleResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'day' => $this->day_of_week,
            'day_label' => Formatter::dayLabel($this->day_of_week),
            'open_time' => Carbon::parse($this->open_time)->format('H:i'),
            'close_time' => Carbon::parse($this->close_time)->format('H:i'),
            'method' => $this->method,
            'method_label' => Formatter::methodLabel($this->method),
            'is_active' => (bool) $this->is_active,
        ];
    }
}
