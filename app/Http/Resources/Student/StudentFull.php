<?php

namespace App\Http\Resources\Student;

use App\Http\Resources\Api\Cities;
use App\Http\Resources\Api\Faculty;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StudentFull extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'first_name'    => $this->resource->first_name ?? "",
            'last_name'     => $this->resource->last_name ?? "",
            'middle_name'   => $this->resource->middle_name ?? "",
            'phone'         => $this->resource->phone ?? "",
            'city'          => Cities::make($this->resource->city) ?? "",
            'faculty_id'    => (int) $this->resource->faculty_id,
            'gender'        => $this->resource->gender ?? "",
//            'benefits'      => $this->resource->benefits ?? "",
            'course'        => (int) $this->resource->course,
            'privilege'     => $this->resource->privileges->first()->id ?? [],
        ];
    }
}
