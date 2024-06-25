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

    Route::resource('rooms', RoomController::class)->except([
        'create', 'store', 'update', 'destroy'
    ]);

    Route::resource('book', OrdersController::class)->except([
        'create', 'update'
    ]);

    Route::get('faculties', [FacultyController::class, 'index']);

    Route::resource('profile', StudentProfileController::class)->except([
        'create', 'store', 'destroy', 'edit',
    ]);

    Route::get('cities', [CitiesController::class, 'index']);

    Route::patch('profile/me', [StudentProfileController::class, 'update']);
});

Route::get('email/verify/{id}', [Verivy::class, 'verify'])->name('verification.verify');

Route::get('email/send',  [Verivy::class, 'send'])->name('verification.resend');
