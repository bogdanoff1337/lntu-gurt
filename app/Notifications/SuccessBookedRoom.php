<?php

namespace App\Notifications;

use App\Models\Room;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class SuccessBookedRoom extends Notification implements ShouldQueue
{
    use Queueable;

    private Room $room;
    /**
     * Create a new notification instance.
     */
    public function __construct(Room $room)
    {
        $this->room = $room;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Ваше бронювання кімнати підтверджено')
            ->greeting('Вітаємо, ' . $notifiable->name . '!')
            ->line('Інформація про кімнату:')
            ->line('Номер кімнати: ' . $this->room->number)
            ->action('Переглянути бронювання', url('/booked'))
            ->line('Дякуємо за використання нашого сервісу!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'room_id' => $this->room->id,
            'room_number' => $this->room->number,
        ];
    }
}
