<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Customers/Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        // Fill the user's profile information with validated data
        $request->user()->fill($request->validated());

        // If the email is changed, set email verification to null
        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        // Capitalize various fields in the user's profile
        $customer = $request->user();
        $customer->company_name = ucfirst($customer->company_name);
        $customer->first_name = ucfirst($customer->first_name);
        $customer->last_name = ucfirst($customer->last_name);
        $customer->address = ucfirst($customer->address);
        $customer->city = ucfirst($customer->city);

        // Save the updated profile
        $customer->save();

        // Redirect back to the profile edit page
        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        // Validate the user's password before proceeding
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        // Clear media collection for each app associated with the user
        $user->cr_apps->each(function ($app) {
            $app->clearMediaCollection('posters');
        });

        // Logout the user
        Auth::logout();

        // Delete the user's account
        $user->delete();

        // Invalidate the session and regenerate the CSRF token
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        // Redirect to the home page
        return Redirect::to('/');
    }
}
