<?php

namespace App\Http\Resources\Api\Room;

use App\Http\Resources\Api\Dormitory;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class Short extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'        => $this->resource->id,
            'images'    => $this?->getFirstMediaUrl('room', 'preview'),
            'dormitory' => Dormitory::make($this->resource->dormitory),
            'faculty'   => $this->resource->faculty->only('id', 'slug','slug_short'),
            'gender'    => $this->resource->gender,
            'number'    => $this->resource->number,
        ];
    }
}
