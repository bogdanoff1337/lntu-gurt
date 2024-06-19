<?php

namespace App\Observers;
use App\Models\Student;

class StudentProfileObserver
{
    public function updated(Student $student): void
    {
        $requiredFields = [
            'email',
            'password',
            'first_name',
            'last_name',
            'middle_name',
            'gender',
            'phone',
            'city_id',
            'benefits',
            'email_verified_at',
            'faculty_id',
            'course',
        ];

        $allFieldsFilled = true;

        foreach ($requiredFields as $field) {
            if ($student->$field === null) {
                $allFieldsFilled = false;
                break;
            }
        }

        if ($allFieldsFilled) {
            $student->is_edit = true;
            $student->save();
        }
    }
}
