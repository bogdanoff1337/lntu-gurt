<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\StudentReguest;
use App\Models\AccessToRegister;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Auth;

class StudentAuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['me','register','login','logout','refresh']]);
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
            return response()->json(['status' => 403]);
        }

        return $this->respondWithToken($token);
    }
    /**
     * Handle an incoming authentication request.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if ($token = $this->guard()->attempt($credentials)) {
            return $this->respondWithToken($token);
        }
        return response()->json(['error' => 'Unauthorized'], 401);
    }

    /**
     * Get the authenticated User
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        if (!$this->guard()->user()) {
            return response()->json(['messages' => 'Unauthorized'], 401);
        }
        return response()->json($this->guard()->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        $this->guard()->logout();

        return response()->json(['message' => 'Successfully logged out','status' => 404] );
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken($this->guard()->refresh());
    }

    protected function sendError()
    {
        return response()->json(['status' => 403]);
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => JWTAuth::factory()->getTTL() * 60
        ]);
    }

    /**
     * Get the guard to be used during authentication.
     *
     * @return \Illuminate\Contracts\Auth\Guard
     */
    public function guard()
    {
        return Auth::guard();
    }
}
