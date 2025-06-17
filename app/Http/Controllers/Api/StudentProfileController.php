<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Student\StudentFull;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Student\Profile as StudentUpdateRequest;

class StudentProfileController extends Controller
{
    protected function index(): JsonResource
    {
        $profile = Auth::user();

        return new StudentFull($profile);
    }

    protected function update(StudentUpdateRequest $request): JsonResource|JsonResponse
    {
        $validatedData = $request->validated();

        $student = Auth::user();

        $student->update($validatedData);

         $student->privileges()->firstOrCreate([
            'student_id' => $student->id,
            'privilege_id' => $validatedData['privilege'],
        ]);

        $student->load('privileges');
        dd($student);
        return new StudentFull($student);
    }
}
