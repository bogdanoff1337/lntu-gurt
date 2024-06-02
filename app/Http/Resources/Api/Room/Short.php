<?php

namespace App\Http\Resources\Api\Room;

use App\Http\Resources\Api\Dormitory;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class Short extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'        => $this->id,
            'images'    => $this?->getFirstMediaUrl('room', 'preview'),
            'dormitory' => Dormitory::make($this->dormitory),
            'faculty'   => $this->faculty->only('id', 'slug','slug_short'),
            'gender'    => $this->gender,
            'number'    => $this->number,
        ];
    }
}
