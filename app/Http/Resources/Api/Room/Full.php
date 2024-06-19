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
            'id' => $this->id,
            'images' => $this->getMedia('room')->map(function ($media) {
                return $media?->getUrl('preview');
            }) ?? null,
            'dormitory' => Dormitory::make($this->dormitory),
            'faculty'   => Faculty::make($this->faculty),
            'places'    => $this->places,
            'number'    => $this->number,
            'floor'     => $this->floor,
            'block'     => $this->block,
            'gender'    => $this->gender,
            'section'   => $this->section,
            'booked'    => OrderRoom::isBooked(),
            'status'    => OrderRoom::status() ?? null,
            'gender_match'  => OrderRoom::isGender($this->id),
            'date' => [
                'this'     => Settings::get('end_date'),
                'deadline' => OrderRoom::deadline(),
            ],
        ];
    }
}
