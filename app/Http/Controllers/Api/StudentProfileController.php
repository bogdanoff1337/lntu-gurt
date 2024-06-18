<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Student\StudentFull;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Student\Profile as StudentUpdateRequest;
use Illuminate\Http\Request;
class StudentProfileController extends Controller
{
    public function index()
    {
        $profile = auth()->user();

        return new StudentFull($profile);
    }

    public function update(Request $request)
    {
        $validatedData = $request->all();

        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $user->update($validatedData);

        return new StudentFull($user);
    }
}
