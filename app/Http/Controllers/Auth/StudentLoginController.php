<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\StudentReguest;
use App\Models\Student;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
class StudentLoginController extends Controller
{

    /**
     * Handle an incoming authentication request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(StudentReguest $request)
    {
        $request->validated();

        $user = Student::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return $this->sendError('Unauthorized', [], 401);
        }

        $token = $user->createToken($request->email)->accessToken;

        $response = [
            'status' => 'success',
            'message' => 'User logged in successfully.',
            'data' => [
                'user' => $user,
                'token' => $token,
            ],
        ];

        return $this->sendResponse($response, 200);
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
