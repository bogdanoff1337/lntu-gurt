<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Api\Room\Short as RoomShort;
class Order extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->resource->id,
            'room' => RoomShort::make($this->resource->room),
            'status' => $this->resource->status,
        ];
    }
}
