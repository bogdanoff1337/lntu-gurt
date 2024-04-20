<?php

namespace App\Observers;

use App\Models\Order;
use App\Models\Room;
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

        // Перевіряємо, чи змінився статус замовлення
        if ($order->isDirty('status')) {
            $oldStatus = $order->getOriginal('status');
            $newStatus = $order->status;

            if ($newStatus === 'new') {
                $order->room_id = null;
            }

            // Якщо статус змінився на 'approved' (затверджено), зменшуємо кількість місць у кімнаті
            if ($newStatus === 'approved') {
                $room = Room::find($order->room_id);

                // Перевіряємо, чи кімната існує та має доступні місця
                if ($room && $room->places > 0) {
                    // Якщо кількість місць перевищує 4, обмежуємо їх до 4
                    if ($room->places > 4) {
                        $room->update(['places' => 4]);
                    } else {
                        $room->decrement('places');
                    }
                }
            }

            if ($oldStatus === 'approved') {
                $room = Room::find($order->room_id);

                // Перевіряємо, чи кімната існує
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
