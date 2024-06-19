<?php

namespace App\Helpers;

use App\Models\Room;
use App\Models\Settings;
use App\Models\Order;
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
        $date = Carbon::now()->format('Y-m-d');
        $deadline = Settings::get('end_date');

        if ($date < $deadline) {
            return false;
        }

        return true;
    }

    public static function isGender($id): bool
    {
        $user       = Auth::user();
        $roomGender = Room::where('id', $id)->get('gender')->first();
        $gender     = $user->gender ;
        $roomGender = $roomGender->gender;

        return $gender === $roomGender;
    }

    public static function isFaculty($id): bool
    {
        $user        = Auth::user();
        $roomFaculty = Room::where('id', $id)->get('faculty_id')->first();
        $faculty     = $user->faculty_id ;
        $roomFaculty = $roomFaculty->faculty_id;

        return $faculty == $roomFaculty;
    }
}
