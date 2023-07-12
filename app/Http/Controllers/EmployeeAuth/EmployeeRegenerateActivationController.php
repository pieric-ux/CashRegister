<?php

namespace App\Http\Controllers\EmployeeAuth;

use App\Http\Controllers\Controller;
use App\Models\CR_Employees;
use App\Notifications\EmployeePasswordlessNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Str;

class EmployeeRegenerateActivationController extends Controller
{

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CR_Employees $employee)
    {
        dd($request);
        $passwordless = Str::uuid();
        $loginRoute = 'employees.login';
        $applicationSlug = $employee->cr_workstations->cr_apps->slug;


        $employee->update([
            'passwordless' => $passwordless,
        ]);

        // logout employee

        Notification::send($employee, new EmployeePasswordlessNotification($passwordless, $loginRoute, $applicationSlug));

        return redirect()->back();
    }
}
