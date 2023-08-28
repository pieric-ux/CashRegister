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
        // Check if the registered user is an instance of CR_Employees
        if ($event->user instanceof CR_Employees) {
            // Define the login route and application slug
            $loginRoute = 'employees.login';
            $applicationSlug = $event->user->cr_workstations->cr_apps->slug;

            // Send the passwordless notification to the employee
            Notification::send($event->user, new EmployeePasswordlessNotification($event->user->passwordless, $loginRoute, $applicationSlug));
        }
    }
}
