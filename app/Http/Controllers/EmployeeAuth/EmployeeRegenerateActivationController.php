<?php

namespace App\Http\Controllers\EmployeeAuth;

use App\Http\Controllers\Controller;
use App\Models\CR_Employees;
use App\Notifications\EmployeePasswordlessNotification;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Str;

class EmployeeRegenerateActivationController extends Controller
{
    /**
     * Update the specified employee's activation information.
     */
    public function update(Request $request, CR_Employees $employee): RedirectResponse
    {
        // Generate a new UUID to be used as a passwordless token
        $passwordless = Str::uuid();

        // Name of the login route for employees
        $loginRoute = 'employees.login';

        // Get the slug of the associated application
        $applicationSlug = $employee->cr_workstations->cr_apps->slug;

        // Update the employee's passwordless token and set logout flag to true
        $employee->update([
            'passwordless' => $passwordless,
            'logout' => true,
        ]);

        // Send a notification to the employee with the new passwordless token
        Notification::send($employee, new EmployeePasswordlessNotification($passwordless, $loginRoute, $applicationSlug));

        // Redirect back to the previous page
        return redirect()->back();
    }
}
