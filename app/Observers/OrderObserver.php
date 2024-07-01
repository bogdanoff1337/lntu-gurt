<?php

namespace App\Observers;

use App\Models\Order;
use App\Models\Room;
use App\Models\Student;
use App\Notifications\SuccessBookedRoom;
use Illuminate\Support\Facades\Notification;

class OrderObserver
{
    /**
     * Handle the Order "created" event.
     */
    public function created(Order $order): void
    {
        //
    }

    /**
     * Handle the Order "updated" event.
     */
    public function updated(Order $order): void
    {
        if ($order->isDirty('status')) {
            $oldStatus = $order->getOriginal('status');
            $newStatus = $order->status;

            if ($newStatus === 'new') {
                $order->room_id = null;
            }

            if ($newStatus === 'approved') {
                $room = Room::find($order->room_id);
                $student = Student::find($order->student_id);
                Notification::route('mail', $student->email)
                    ->route('telegram', env('TELEGRAM_CHAT_ID'))
                    ->notify(new SuccessBookedRoom($room));
                if ($room && $room->places > 0) {
                    if ($room->places > 4) {
                        $room->update(['places' => 4]);
                    } else {
                        $room->decrement('places');
                    }
                }
            }

            if ($oldStatus === 'approved' && $newStatus === 'rejected') {
                $room = Room::find($order->room_id);

                if ($room) {
                    $room->increment('places');
                }
            }
        }
    }



    /**
     * Handle the Order "deleted" event.
     */
    public function deleted(Order $order): void
    {
        //
    }

    /**
     * Handle the Order "restored" event.
     */
    public function restored(Order $order): void
    {
        //
    }

    /**
     * Handle the Order "force deleted" event.
     */
    public function forceDeleted(Order $order): void
    {
        //
    }
}
