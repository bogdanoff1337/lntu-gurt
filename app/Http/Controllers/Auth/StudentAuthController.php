<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\AccessToRegister;
use App\Models\Student;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Contracts\Auth\Guard;
class StudentAuthController extends Controller
{
    public function register(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'title' => 'Поля заповнені неправильно',
                'text' => 'Перевірте правильність введених даних'
            ], 422);
        }

        $validated = $validator->validated();

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

        if (Student::where('email', $validated['email'])->exists()) {
            return response()->json(
                [
                    'title' => 'Користувач з такою поштою вже зареєстрований',
                    'text' => 'Перевірте правильність введених даних'
                ], 409);
        }

        Student::create([
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);


        if (!$token = JWTAuth::attempt($request->only('email', 'password'))) {
            return response()->json(['error' => 'forbidden'], 403);
        }

        return $this->respondWithToken($token);
    }

    public function login(Request $request): JsonResponse
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
            ], 422);
        }

        if ($token = $this->guard()->attempt($credentials)) {
            return $this->respondWithToken($token);
        }

        return response()->json([
                'title' => 'Неправильний логін чи пароль',
                'text' => 'Перевірте правильність введених даних'
            ], 422);
    }

    public function me()
    {
        if (!$this->guard()->user()) {
            return response()->json(['messages' => 'Unauthorized'], 401);
        }

        $profile = [
            'profile' => $this->guard()->user()->only([
                'email',
                'first_name',
                'last_name',
                'middle_name',
                'phone',
                'city',
                'benefits',
                'gender',
                'phone'
            ]),
            'id' => $this->guard()->user()->id,
            'verified' => $this->guard()->user()->email_verified_at !== null,
        ];

        return $profile;
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

    public function guard(): Guard
    {
        return Auth::guard();
    }
}
