<?php

namespace App\Console\Commands;

use App\Models\Settings;
use App\Models\Student;
use Illuminate\Console\Command;

class ProcessStudentsCourse extends Command
{
    protected $signature = 'app:process-students-course';

    protected $description = 'Process students course';

    public function handle(): void
    {
        $setting = Settings::get('last_course');
        $students = Student::all();

        foreach ($students as $student) {
            if($student->is_active && $student->course < $setting + 1) {
                $student->course += 1;
            }

            if ($student->course === $setting + 1) {
                $student->is_active = false;
                $student->course = 0;
            }

            $student->save();
        }
    }
}
