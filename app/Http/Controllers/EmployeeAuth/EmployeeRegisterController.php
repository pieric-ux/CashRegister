<?php

namespace App\Http\Controllers\EmployeeAuth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterEmployeeRequest;
use App\Models\CR_Module;
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
    public function store(RegisterEmployeeRequest $request, CR_Module $module): RedirectResponse
    {
        $workstation = $module->cr_workstations->first();

        $passwordless = Str::uuid();

        $employee = $workstation->cr_employees()->create([
            'first_name' => ucfirst($request->input('first_name')),
            'last_name' => ucfirst($request->input('last_name')),
            'phone' => $request->input('phone'),
            'email' => $request->input('email'),
            'passwordless' => $passwordless,
        ]);

        event(new Registered($employee));

        return Redirect::route('employees.index', $module);
    }
}
