<?php

namespace App\Http\Resources\Student;

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
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'father_name' => $this->middle_name,
            'phone' => $this->phone,
            'address' => $this->city,
            'gender' => $this->gender,
            'benefits' => $this->benefits,
        ];
    }
}
