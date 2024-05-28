<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Student\StudentFull;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StudentProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $profile = auth()->user();

        return new StudentFull($profile);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $validatedData = $request->all();

        $user = Auth::user();

        if(!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $user->update($validatedData);

        return new StudentFull($user);
    }
}
