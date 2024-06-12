<?php

namespace App\Helpers;

use App\Models\Settings;
use App\Models\Order; // Припускаючи, що у вас є модель Order
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class OrderRoom
{
    public static function isBooked(): bool
    {
        $user = Auth::user();

        $booked = Order::where('student_id', $user->id)
            ->orWhere('status', 'rejected')
            ->first();

        return $booked !== null;
    }

    public static function status(): ?string
    {
        $user = Auth::user();

        $status = Order::where('student_id', $user->id)
            ->orWhere('status', 'rejected')
            ->first();

        return $status ? $status->status : null;
    }

    public static function deadline(): bool
    {
        $date = Carbon::now();
        $deadline = Settings::get('end_date');

        return $date->lte($deadline);
    }
}
