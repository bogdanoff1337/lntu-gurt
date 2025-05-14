<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Services\Auth\StudentAuthService;

class StudentAuthController extends Controller
{
    protected StudentAuthService $authService;

    public function __construct(StudentAuthService $authService)
    {
        $this->authService = $authService;
    }

    public function register(Request $request): JsonResponse
    {
        return $this->authService->register($request);
    }

    public function login(Request $request): JsonResponse
    {
        return $this->authService->login($request);
    }

    public function me(): array
    {
        return $this->authService->me();
    }

    public function logout(): JsonResponse
    {
        return $this->authService->logout();
    }

    public function refresh(): JsonResponse
    {
        return $this->authService->refresh();
    }
}
