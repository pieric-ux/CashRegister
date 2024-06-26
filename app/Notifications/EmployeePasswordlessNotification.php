<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Lang;

class EmployeePasswordlessNotification extends Notification
{
    use Queueable;

    protected $passwordless;
    protected $loginRoute;
    protected $moduleSlug;

    /**
     * Create a new notification instance.
     */
    public function __construct($passwordless, $loginRoute, $moduleSlug)
    {
        $this->passwordless = $passwordless;
        $this->loginRoute = $loginRoute;
        $this->moduleSlug = $moduleSlug;
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
        $loginUrl = route($this->loginRoute, [
            'module' => $this->moduleSlug,
            'code' => $this->passwordless,
        ]);

        return (new MailMessage)
            ->subject(Lang::get('email-notification.activation_subject'))
            ->line(Lang::get('email-notification.activation_line'))
            ->line($this->passwordless)
            ->action(Lang::get('email-notification.activation_action'), $loginUrl);
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
