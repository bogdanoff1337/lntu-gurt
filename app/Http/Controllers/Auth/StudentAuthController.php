<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\AccessToRegister;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StudentAuth\StudentRequest;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Validator;

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

    public function register(Request $request)
    {
        // Validate the incoming request
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|min:8',
        ]);

        // Check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Retrieve the validated data
        $validated = $validator->validated();
        // Check if the email has access to register
        $access = AccessToRegister::where('email', $validated['email'])
            ->where('access', true)
            ->first();

        if (!$access) {
            return response()->json(
                [
                    'title' => 'Немає доступу до реєстрації',
                    'text' => 'Вашої пошти немає в списку кандидатів на заселення в гуртожитки'
                ], 403);
        }
        // Check if the student already exists
        if (Student::where('email', $validated['email'])->exists()) {
            return response()->json(['error' => 'already exists'], 409);
        }

        // Create the new student
        $user = Student::create([
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        // Fire the Registered event
        event(new Registered($user));

        // Attempt to create a token for the newly registered user
        if (!$token = JWTAuth::attempt($request->only('email', 'password'))) {
            return response()->json(['error' => 'forbidden'], 403);
        }

        // Return the token in the response
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

        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'title' => 'Неправильний логін чи пароль',
                'text' => 'Перевірте правильність введених даних'
            ], 404);
        }

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
