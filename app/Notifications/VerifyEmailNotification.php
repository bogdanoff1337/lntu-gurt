<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Auth\Notifications\VerifyEmail;

class VerifyEmailNotification extends VerifyEmail implements ShouldQueue
{
    use Queueable;

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Вкрифікація електронної пошти')
            ->line('Натисніть кнопку нижче, щоб підтвердити свою електронну адресу')
            ->action('Вкрифікація', $this->verificationUrl($notifiable));
    }
}
