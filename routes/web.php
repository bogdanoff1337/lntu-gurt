<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\Verivy;

Route::get('{any?}', fn () => view("main"))->where('any', '.*');
