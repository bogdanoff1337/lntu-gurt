<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Student\StudentFull;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Student\Profile as StudentUpdateRequest;
class StudentProfileController extends Controller
{
    public function index()
    {
        $profile = auth()->user();

        return new StudentFull($profile);
    }

    public function update(StudentUpdateRequest $request)
    {
        $validatedData = $request->validated();

        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $user->update($validatedData);

        return new StudentFull($user);
    }
}
