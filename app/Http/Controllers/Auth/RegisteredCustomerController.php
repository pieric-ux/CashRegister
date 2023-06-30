<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredCustomerController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'company_name' => 'nullable|string|max:255',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'npa' => 'required|integer',
            'city' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:' . Customer::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $customer = Customer::create([
            'company_name' => $request->company_name,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'address' => $request->address,
            'npa' => $request->npa,
            'city' => $request->city,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($customer));

        Auth::login($customer);

        return redirect(RouteServiceProvider::HOME);
    }
}
