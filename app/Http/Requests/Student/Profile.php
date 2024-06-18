<?php

namespace App\Http\Requests\Student;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
class Profile extends FormRequest
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
        $userId = $this->user()->id;

        return [
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'middle_name' => 'string',
            'phone' => ['required','string', Rule::unique('students')->ignore($userId)],
            'city_id' => 'required|exists:cities,id',
            'faculty_id' => 'required|exists:faculties,id',
            'course' => 'required|integer',
            'benefits' => 'string',
            'gender' => 'required|string',
        ];
    }
}
