<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\DormitoryController;
use App\Http\Controllers\Api\OrdersController;
use App\Http\Controllers\Api\RoomController;
use App\Http\Controllers\Api\FacultyController;
use App\Http\Controllers\Auth\StudentAuthController;
use App\Http\Controllers\Api\StudentProfileController;
use App\Http\Controllers\Api\Verivy;
use App\Http\Controllers\Api\CitiesController;
use NotificationChannels\Telegram\TelegramUpdates;

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('login', [StudentAuthController::class, 'login'])->name('login');
    Route::post('logout', [StudentAuthController::class, 'logout'])->name('logout');
    Route::post('refresh', [StudentAuthController::class, 'refresh'])->name('refresh');
    Route::post('me', [StudentAuthController::class, 'me'])->name('me');
    Route::post('register', [StudentAuthController::class, 'register'])->name('register');
});

Route::group(['middleware' => 'jwt.auth'], function () {
    Route::get('dormitories', [DormitoryController::class, 'index']);
    Route::apiResource('rooms', RoomController::class);
    Route::apiResource('book', OrdersController::class);
    Route::get('faculties', [FacultyController::class, 'index']);
    Route::apiResource('profile', StudentProfileController::class);
    Route::get('cities', [CitiesController::class, 'index']);
    Route::patch('profile/me', [StudentProfileController::class, 'update']);
});

Route::get('email/verify/{id}', [Verivy::class, 'verify'])->name('verification.verify');

Route::get('email/send',  [Verivy::class, 'send'])->name('verification.resend');
Route::get('/_t', function () {
    $updates = TelegramUpdates::create()
        ->limit(2)

        ->options([
            'timeout' => 0,
        ])
        ->get();

    dd($updates);
})->name('test');
