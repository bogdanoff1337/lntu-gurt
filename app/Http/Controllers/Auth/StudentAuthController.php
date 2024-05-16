<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\AccessToRegister;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Student\StudentReguest;
use Illuminate\Auth\Events\Registered;
class StudentAuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['me','register','login','logout','refresh','update']]);
    }

    public function register(StudentReguest $request)
    {
        $data = $request->validated();

        $access = AccessToRegister::where('email', $request->email)
            ->where('access', true)
            ->first();

        if (!$access) {
            return response()->json(['error' => 'forbidden' ], 403);
        }

        if (Student::where('email', $data['email'])->exists()) {
            return response()->json(['error' => 'already exists' ], 409);
        }

        $student = Student::create([
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        event(new Registered($student));

        $student->markEmailAsVerified();

        if (!$token = JWTAuth::attempt($request->only('email', 'password'))) {
            return response()->json(['error' => 'forbidden'], 403);
        }

        return $this->respondWithToken($token);
    }
    /**
     * Handle an incoming authentication request.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(StudentReguest $request)
    {
        $credentials = $request->validated();

        if ($token = $this->guard()->attempt($credentials)) {
            return $this->respondWithToken($token);
        }

        return response()->json(['error' => 'Not found'], 404);
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


    public function update(StudentRequest $request)
    {
        $user = $this->guard()->user();

        if (!$user) {
            return response()->json(['messages' => 'Unauthorized'], 401);
        }

        $user->update($request->validated());

        return $this->respondWithToken($this->guard()->refresh());
    }
    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        $this->guard()->logout();

        return response()->json(['message' => 'logout']);
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

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type'   => 'bearer',
            'expires_in'   => JWTAuth::factory()->getTTL() * 60
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
