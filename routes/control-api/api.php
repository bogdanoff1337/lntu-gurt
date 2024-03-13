<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\DormitoryController;
use App\Http\Controllers\Api\OrdersController;
use App\Http\Controllers\Api\RoomController;
use App\Http\Controllers\Api\FacultyController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::middleware('ControlMiddlware')->group(function (){

    Route::resource('dormitories', DormitoryController::class)->except([
        'create', 'store', 'update', 'destroy'
    ]);

    Route::resource('rooms', RoomController::class)->except([
        'create', 'store', 'update', 'destroy'
    ]);

    Route::resource('orders', OrdersController::class)->except([
        'create', 'store', 'update', 'destroy'
    ]);

    Route::resource('faculties', FacultyController::class)->except([
        'create', 'store', 'update', 'destroy'
    ]);
});


