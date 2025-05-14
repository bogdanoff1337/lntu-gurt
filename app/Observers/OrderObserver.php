<?php

namespace App\Observers;

use App\Models\Order;
use App\Models\Room;
use App\Models\Student;
use App\Notifications\SuccessBookedRoom;
use Filament\Notifications\Notification;
use Illuminate\Validation\ValidationException;

class OrderObserver
{
    public function updating(Order $order): void
    {
        if (! $order->isDirty('status')) {
            return;
        }

        $old = $order->getOriginal('status');
        $new = $order->status;

        if ($new === 'approved' && $old !== 'approved') {
            $room = $order->room;

            if (! $room || $room->places <= 0) {
                Notification::make()
                    ->danger()
                    ->title('Неможливо затвердити')
                    ->body('Вільних місць більше немає.')
                    ->send();

                throw ValidationException::withMessages([
                    'status' => 'Неможливо затвердити — вільних місць більше немає.',
                ]);
            }
        }
    }

    public function updated(Order $order): void
    {
        if (! $order->wasChanged('status')) {
            return;
        }

        $old = $order->getOriginal('status');
        $new = $order->status;
        $room = $order->room;

        if ($new === 'approved' && $old !== 'approved' && $room) {
            $room->decrement('places');
        }

        if ($old === 'approved' && $new !== 'approved' && $room) {
            $room->increment('places');
        }

        if ($new === 'new' && $order->room_id !== null) {
            $order->updateQuietly(['room_id' => null]);
        }
    }

//    /**
//     * Handle the Order "updated" event.
//     */
//    public function updated(Order $order): void
//    {
//        if (! $order->wasChanged('status')) {
//            return;
//        }
//
//        $old = $order->getOriginal('status');
//        $new = $order->status;
//        $room = $order->room;
//        $student = $order->student;
//
//        }
//
//        // approved ← будь-що: резервуємо місце
//        if ($new === 'approved' && $old !== 'approved' && $room) {
//            $room->decrement('places');
////            Notification::route('mail', $student->email)
////                ->route('telegram', env('TELEGRAM_CHAT_ID'))
////                ->notify(new SuccessBookedRoom($room));
//        }
//
//        // будь-що ← approved: повертаємо місце
//        if ($old === 'approved' && $new !== 'approved' && $room) {
//            $room->increment('places');
//        }
//
//        // new ← будь-що: відв’язуємо кімнату
//        if ($new === 'new' && $order->room_id !== null) {
//            $order->updateQuietly(['room_id' => null]);
//        }
//    }

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
