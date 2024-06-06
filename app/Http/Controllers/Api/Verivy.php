<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class Verivy extends Controller
{
    public function verify($user_id, Request $request): RedirectResponse|JsonResponse
    {
        if (!$request->hasValidSignature()) {
            return response()->json(["messages" => "Invalid/Expired url provided"], 401);
        }

        $user = Student::findOrFail($user_id);

        if (!$user->hasVerifiedEmail()) {
            $user->markEmailAsVerified();
        }

        return redirect()->to('/');
    }

    public function send(): JsonResponse
    {
        if (auth()->user()->hasVerifiedEmail()) {
            return response()->json(["messages" => "Email already verified"], 400);
        }

        auth()->user()->sendEmailVerificationNotification();

        return response()->json();
    }
}
