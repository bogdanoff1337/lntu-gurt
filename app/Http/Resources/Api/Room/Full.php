<?php

namespace App\Http\Resources\Api\Room;

use App\Http\Resources\Api\Dormitory;
use App\Http\Resources\Api\Faculty;
use App\Models\Settings;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Helpers\OrderRoom;
class Full extends JsonResource
{
    public function toArray(Request $request): array
    {
        return  [
            'id' => $this->resource->id,
            'images' => $this->getMedia('room')->map(function ($media) {
                return $media?->getUrl('preview');
            }) ?? null,
            'dormitory' => Dormitory::make($this->resource->dormitory),
            'faculty'   => Faculty::make($this->resource->faculty),
            'places'    => $this->resource->places,
            'number'    => $this->resource->number,
            'floor'     => $this->resource->floor,
            'block'     => $this->resource->block,
            'gender'    => $this->resource->gender,
            'section'   => $this->resource->section,
            'booked'    => OrderRoom::isBooked(),
            'status'    => OrderRoom::status() ?? null,
            'gender_match'  => OrderRoom::isGender($this->resource->id),
            'faculty_match' => OrderRoom::isFaculty($this->resource->id),
            'date' => [
                'this'     => Settings::get('end_date'),
                'deadline' => OrderRoom::deadline(),
            ],
        ];
    }
}
