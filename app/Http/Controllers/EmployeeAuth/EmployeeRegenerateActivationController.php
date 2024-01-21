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
        $passwordless = Str::uuid();

        $loginRoute = 'employees.login';

        $applicationSlug = $employee->cr_workstations->cr_modules->slug;

        $employee->update([
            'passwordless' => $passwordless,
            'logout' => true,
        ]);

        Notification::send($employee, new EmployeePasswordlessNotification($passwordless, $loginRoute, $applicationSlug));

        return redirect()->back();
    }
}
