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
            'section' => 'in:Ліворуч,Праворуч',
            'number' => 'required|string',
            'dormitory_id' => 'required|exists:dormitories,id',
            'faculty_id' => 'required|exists:faculties,id',
            'floor' => 'required|numeric',
            'block' => 'in:Перший,Другий',
            'gender' => 'in:Чоловік,Жінка',
        ];
    }
}
