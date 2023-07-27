<?php

namespace App\Http\Controllers\CustomerAuth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CustomerEmailVerificationPromptController extends Controller
{
    /**
     * Display the email verification prompt.
     */
    public function __invoke(Request $request): RedirectResponse|Response
    {
        return $request->user()->hasVerifiedEmail()
            ? redirect()->intended(RouteServiceProvider::CUSTOMER_HOME)
            : Inertia::render('Customers/Auth/VerifyEmail', [
                'status' => session('status'),
                'translations' => [
                    'emailVerification' => __('Email Verification'),
                    'emailVerificationLabel' => __('Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn\'t receive the email, we will gladly send you another.'),
                    'emailVerificationStatus' => __('A new verification link has been sent to the email address you provided during registration.'),
                    'buttonResendEmailVerification' => __('Resend Verification Email'),
                    'logout' => __('Logout'),
                ],
            ]);
    }
}
