<?php

namespace App\Http\Resources\Student;

use App\Http\Resources\Api\Cities;
use App\Http\Resources\Api\Faculty;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StudentFull extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'first_name' => $this->first_name ?? "",
            'last_name' => $this->last_name ?? "",
            'middle_name' => $this->middle_name ?? "",
            'phone' => $this->phone ?? "",
            'city' => Cities::make($this->city) ?? "",
            'faculty' => Faculty::make($this->faculty) ?? "",
            'gender' => $this->gender ?? "",
            'benefits' => $this->benefits ?? "",
        ];
    }
}
