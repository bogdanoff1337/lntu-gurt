<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\DormitoryController;
use App\Http\Controllers\Api\OrdersController;
use App\Http\Controllers\Api\RoomController;
use App\Http\Controllers\Api\FacultyController;
use App\Http\Controllers\Auth\StudentAuthController;
use App\Http\Controllers\Api\StudentProfileController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {
    Route::post('login', [StudentAuthController::class, 'login'])->name('login');
    Route::post('logout', [StudentAuthController::class, 'logout'])->name('logout');
    Route::post('refresh', [StudentAuthController::class, 'refresh'])->name('refresh');
    Route::post('me', [StudentAuthController::class, 'me'])->name('me');
    Route::post('register', [StudentAuthController::class, 'register'])->name('refresh');
});

Route::group(['middleware' => 'jwt.auth'], function () {

    Route::resource('dormitories', DormitoryController::class)->except([
        'create', 'store', 'update', 'destroy'
    ]);

    Route::resource('rooms', RoomController::class)->except([
        'create', 'store', 'update', 'destroy'
    ]);

    Route::resource('book', OrdersController::class)->except([
        'create', 'update'
    ]);

    Route::resource('faculties', FacultyController::class)->except([
        'create', 'store', 'update', 'destroy'
    ]);

    Route::resource('profile', StudentProfileController::class)->except([
        'create', 'store', 'destroy', 'edit',
    ]);

    Route::patch('profile/me', [StudentProfileController::class, 'update']);
});

