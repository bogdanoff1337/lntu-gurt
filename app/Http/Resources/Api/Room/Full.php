<?php

namespace App\Http\Resources\Api\Room;

use App\Http\Resources\Api\Dormitory;
use App\Http\Resources\Api\Faculty;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class Full extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $prepared =  [
            'id' => $this->id,
            'images' => $this->images,
            'dormitory' => Dormitory::make($this->dormitory),
            'faculty' => Faculty::make($this->faculty),
            'places' => $this->places,
            'number' => $this->number,
            'floor' => $this->floor,
            'block' => $this->block,
            'gender' => $this->gender,
            'section' => $this->section,
            'booked' => $this->isBooked(),
        ];

        return $prepared;
    }

    private function isBooked(): bool
    {
        $user = Auth::user();

        $booked = $this->order()->where('student_id', $user->id)->first();

        if ($booked === null) {
            return false;
        } else {
            return true;
        }
    }

}
