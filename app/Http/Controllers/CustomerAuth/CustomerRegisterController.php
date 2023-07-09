<?php

namespace App\Http\Controllers\CustomerAuth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterCustomerRequest;
use App\Models\Customer;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class CustomerRegisterController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Customers/Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(RegisterCustomerRequest $request): RedirectResponse
    {
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

        return redirect(RouteServiceProvider::CUSTOMER_HOME);
    }
}
