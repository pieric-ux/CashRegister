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
        return Inertia::render('Customers/Auth/Register', [
            'translations' => [
                'register' => __('Register'),
                'inputCompanyNameLabel' => __('Company Name'),
                'facultative' => __('facultative'),
                'inputFirstNameLabel' => __('First Name'),
                'inputLastNameLabel' => __('Last Name'),
                'inputAddressLabel' => __('Address'),
                'inputCityLabel' => __('City'),
                'inputNPALabel' => __('NPA'),
                'inputEmailLabel' => __('Email'),
                'inputPasswordLabel' => __('Password'),
                'inputConfirmPasswordLabel' => __('Confirm Password'),
                'alreadyRegister' => __('Already registered?'),
            ],
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(RegisterCustomerRequest $request): RedirectResponse
    {
        $customer = Customer::create([
            'company_name' => ucfirst($request->company_name),
            'first_name' => ucfirst($request->first_name),
            'last_name' => ucfirst($request->last_name),
            'address' => ucfirst($request->address),
            'npa' => $request->npa,
            'city' => ucfirst($request->city),
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($customer));

        Auth::login($customer);

        return redirect(RouteServiceProvider::CUSTOMER_HOME);
    }
}
