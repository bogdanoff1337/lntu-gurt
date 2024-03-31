<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\DormitoryController;
use App\Http\Controllers\Api\OrdersController;
use App\Http\Controllers\Api\RoomController;
use App\Http\Controllers\Api\FacultyController;
use App\Http\Controllers\Auth\StudentLoginController;
use App\Http\Controllers\Auth\StudentRegisterController;
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

    Route::post('login', [StudentLoginController::class, 'login'])->name('login');
    Route::post('logout', [StudentLoginController::class, 'logout'])->name('logout');
    Route::post('refresh', [StudentLoginController::class, 'refresh'])->name('refresh');
    Route::post('me', [StudentLoginController::class, 'me'])->name('me');
    Route::post('register', [StudentRegisterController::class, 'register'])->name('refresh');
});



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::resource('dormitories', DormitoryController::class)->except([
    'create', 'store', 'update', 'destroy'
]);

Route::resource('rooms', RoomController::class)->except([
    'create', 'store', 'update', 'destroy'
]);

Route::resource('book', OrdersController::class)->except([
    'create','update', 'destroy'
]);

Route::resource('faculties', FacultyController::class)->except([
    'create', 'store', 'update', 'destroy'
]);


