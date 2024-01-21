<?php

namespace App\Http\Controllers\EmployeeAuth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginEmployeeRequest;
use App\Models\CR_Module;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class EmployeeLoginController extends Controller
{
    /**
     * Display the login view for employees.
     */
    public function create(Request $request, CR_Module $module, $code = null): Response
    {
        
        $module = $request->route('module');

        return Inertia::render('Employees/Auth/Login', [
            'application' => $module,
            'status' => session('status'),
            'code' => $code,
        ]);
    }

    /**
     * Handle the authentication request for employees.
     */
    public function store(LoginEmployeeRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        return redirect()->intended(RouteServiceProvider::EMPLOYEE_HOME);
    }

    /**
     * Log out the authenticated employee.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('employee')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
