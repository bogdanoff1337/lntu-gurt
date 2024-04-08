<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
Route::get('/admin/{any?}', fn () => view("control"))->where('any', '.*');
*/

<<<<<<< HEAD
Route::get('admin/{any?}', function ($any = null) {
    return view("control");
})->where('any', '.*');

Route::get('{any?}', function ($any = null) {
    return view("main");
})->where('any', '^(?!admin).*$');
=======
Route::get('{any?}', fn () => view("main"))->where('any', '.*');
>>>>>>> d95c75f6e8549cab0456f6ccb656300b2cab7abb
