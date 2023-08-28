<?php

namespace App\Http\Controllers\EmployeeAuth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginEmployeeRequest;
use App\Models\CR_App;
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
    public function create(Request $request, CR_App $app, $code = null): Response
    {
        // Get the application from the route
        $app = $request->route('app');

        // Render the login view with application, status, and code
        return Inertia::render('Employees/Auth/Login', [
            'application' => $app,
            'status' => session('status'),
            'code' => $code,
        ]);
    }

    /**
     * Handle the authentication request for employees.
     */
    public function store(LoginEmployeeRequest $request): RedirectResponse
    {
        // Authenticate the employee using the provided credentials
        $request->authenticate();

        // Regenerate the session ID to prevent session fixation attacks
        $request->session()->regenerate();

        // Redirect to the intended URL after successful login
        return redirect()->intended(RouteServiceProvider::EMPLOYEE_HOME);
    }

    /**
     * Log out the authenticated employee.
     */
    public function destroy(Request $request): RedirectResponse
    {
        // Log out the authenticated employee using the employee guard
        Auth::guard('employee')->logout();

        // Invalidate the session and regenerate a new session token
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        // Redirect to the home page
        return redirect('/');
    }
}
