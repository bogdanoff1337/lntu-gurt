<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\AccessToRegister;
use App\Models\Student;
use App\Http\Requests\StudentReguest;
use Illuminate\Support\Facades\Hash;

class StudentRegisterController extends Controller
{
    public function register(StudentReguest $request)
    {
        $request->validated();

        $access = AccessToRegister::where('email', $request->email)
            ->where('access', true)
            ->first();

        if (!$access) {
            return $this->sendError('Unauthorized', [], 401);
        }

        $user = Student::create([
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        $token = $user->createToken($request->email)->accessToken;

        $response = [
            'status' => 'success',
            'message' => 'User created successfully.',
            'data' => [
                'user' => $user,
                'token' => $token,
            ],
        ];

        return $this->sendResponse($response, 201);
    }

    private function sendResponse($data, $code)
    {
        return response()->json($data, $code);
    }

    private function sendError($error, $data = [], $code = 404)
    {
        $response = [
            'status' => 'failed',
            'message' => $error,
        ];

        if (!empty($data)) {
            $response['data'] = $data;
        }

        return response()->json($response, $code);
    }
}
