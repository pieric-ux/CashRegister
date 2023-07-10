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
     * Display the login view.
     */
    public function create(Request $request, CR_App $app): Response
    {
        $app = $request->route('app');
        return Inertia::render('Employees/Auth/Login', [
            'application' => $app,
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginEmployeeRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        return redirect()->intended(RouteServiceProvider::EMPLOYEE_HOME);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('employee')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
