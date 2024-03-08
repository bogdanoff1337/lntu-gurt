<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RoomRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'places' => 'required|numeric',
            'section' => 'required|string',
            'number' => 'required|numeric',
            'photos.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048', // TODO: add file validation
            'dormitory_id' => 'required|exists:dormitories,id',
            'floor' => 'required|numeric',
            'block' => 'required|string',
            'gender' => 'required|string',
        ];
    }
}
