<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Student\StudentFull;
use App\Models\Student;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Student\Profile as StudentUpdateRequest;
use Illuminate\Http\Request;
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

        return new StudentFull($student);
    }
}
