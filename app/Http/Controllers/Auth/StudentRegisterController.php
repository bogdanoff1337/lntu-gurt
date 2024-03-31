<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\AccessToRegister;
use App\Models\Student;
use App\Http\Requests\StudentReguest;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
class StudentRegisterController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['register']]);
    }

    public function register(StudentReguest $request)
    {
        $data = $request->validated();

        $access = AccessToRegister::where('email', $request->email)
            ->where('access', true)
            ->first();

        if (!$access) {
            return $this->sendError('Unauthorized', [], 401);
        } 

        if (Student::where('email', $data['email'])->exists()) {
            return response()->json(['status' => 400], );
        }

        Student::create([
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        if (!$token = JWTAuth::attempt($request->only('email', 'password'))) {
            return response()->json(['status' => 401]);
        }

        return $this->respondWithToken($token);
    }

    protected function sendError()
    {
        return response()->json(['status' => 401]);
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => JWTAuth::factory()->getTTL() * 60
        ]);
    }
}
