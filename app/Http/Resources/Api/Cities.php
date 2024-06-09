<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class Cities extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // for first letter of each word to be uppercase, and the rest lowercase
        return [
            'id' => $this->id,
            'city' => mb_convert_case($this->region, MB_CASE_TITLE, "UTF-8") . ' обл., ' .
                mb_convert_case($this->community, MB_CASE_TITLE, "UTF-8") . ' р-н., ' .
                mb_convert_case($this->name, MB_CASE_TITLE, "UTF-8"),
        ];

    }
}
