<?php

namespace App\Listeners;

use App\Models\CR_Employees;
use App\Notifications\EmployeePasswordlessNotification;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Notification;

class SendEmailPasswordlessNotification
{
    /**
     * Handle the event.
     *
     * @param  \Illuminate\Auth\Events\Registered  $event
     * @return void
     */
    public function handle(Registered $event): void
    {
        if ($event->user instanceof CR_Employees) {
            $loginRoute = 'employees.login';
            $applicationSlug = $event->user->cr_workstations->cr_modules->slug;

            Notification::send($event->user, new EmployeePasswordlessNotification($event->user->passwordless, $loginRoute, $applicationSlug));
        }
    }
}
