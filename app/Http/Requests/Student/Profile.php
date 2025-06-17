<?php

namespace App\Http\Requests\Student;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

/**
* @property string $first_name
* @property string $last_name
* @property string|null $middle_name
* @property string $phone
* @property int $city_id
* @property int $faculty_id
* @property int $course
* @property string|null $benefits
* @property int|null $privilege
* @property string $gender
*/
class Profile extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $userId = $this->user()->id;

        return [
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'middle_name' => 'string',
            'phone' => ['required','string', Rule::unique('students')->ignore($userId)],
            'city_id' => 'nullable|exists:cities,id',
            'faculty_id' => 'required|exists:faculties,id',
            'course' => 'required|integer',
            'benefits' => 'nullable|string',
            'privilege' => 'nullable|exists:privileges,id',
            'gender' => 'required|string',
        ];
    }
}
