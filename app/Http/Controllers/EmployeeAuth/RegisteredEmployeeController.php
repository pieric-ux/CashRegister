<?php

namespace App\Http\Controllers\EmployeeAuth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterEmployeeRequest;
use App\Models\CR_App;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;

class RegisteredEmployeeController extends Controller
{

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(RegisterEmployeeRequest $request, CR_App $app): RedirectResponse
    {
        $workstation = $app->cr_workstations->first();

        $employee = $workstation->cr_employees()->create([
            'first_name' => $request->input('first_name'),
            'last_name' => $request->input('last_name'),
            'phone' => $request->input('phone'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->password),
        ]);

        /*event(new Registered($employee));

        Auth::login($employee);*/

        return Redirect::route('employees.index', $app);
    }
}
