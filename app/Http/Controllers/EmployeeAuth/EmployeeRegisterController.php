<?php

namespace App\Http\Controllers\EmployeeAuth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterEmployeeRequest;
use App\Models\CR_App;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str;

class EmployeeRegisterController extends Controller
{
    /**
     * Handle an incoming registration request for an employee.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(RegisterEmployeeRequest $request, CR_App $app): RedirectResponse
    {
        // Get the first workstation associated with the application
        $workstation = $app->cr_workstations->first();

        // Generate a UUID to be used as a passwordless token
        $passwordless = Str::uuid();

        // Create a new employee for the specified workstation
        $employee = $workstation->cr_employees()->create([
            'first_name' => ucfirst($request->input('first_name')),
            'last_name' => ucfirst($request->input('last_name')),
            'phone' => $request->input('phone'),
            'email' => $request->input('email'),
            'passwordless' => $passwordless,
        ]);

        // Fire the 'Registered' event for the employee
        event(new Registered($employee));

        // Redirect to the employee index page with the associated application
        return Redirect::route('employees.index', $app);
    }
}
