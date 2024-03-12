<?php

namespace App\Http\Resources\Api\Room;

use App\Http\Resources\Api\Dormitory;
use App\Http\Resources\Api\Faculty;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class Full extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'photos' => $this->images->pluck('url'),
            'dormitory' => Dormitory::make($this->dormitory),
            'faculty' => Faculty::make($this->faculty),
            'places' => $this->places,
            'number' => $this->number,
            'floor' => $this->floor,
            'block' => $this->block,
            'gender' => $this->gender,
            'section' => $this->section,
        ];
    }
}
