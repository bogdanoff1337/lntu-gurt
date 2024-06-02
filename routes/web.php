<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\Verivy;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
Route::get('{any?}', fn () => view("main"))->where('any', '.*');
*/



Route::get('/email/verify', [EmailVerificationRequest::class, '__invoke'])
    ->name('verification.notice');

Route::get('/email/verify/{id}/{hash}', [Verivy::class, '__invoke'])
    ->middleware('signed')
    ->name('verification.verify');

Route::post('/email/verification-notification', [EmailVerificationRequest::class, '__invoke'])
    ->name('verification.send');
