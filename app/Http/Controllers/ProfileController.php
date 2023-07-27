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
            'translations' => [
                'updateAvatarTitle' => __('Update Avatar'),
                'updateAvatarLabel' => __('Update your avatar\'s profile.'),
                'ariaAvatarUpdateButton' => __('Upload your avatar'),
                'profileInformationTitle' => __('Profile Information'),
                'profileInformationLabel' => __('Update your account\'s profile information and email address.'),
                'inputCompanyNameLabel' => __('Company Name'),
                'inputFirstNameLabel' => __('First Name'),
                'inputLastNameLabel' => __('Last Name'),
                'inputAddressLabel' => __('Address'),
                'inputCityLabel' => __('City'),
                'inputNPALabel' => __('NPA'),
                'inputPhoneLabel' => __('Phone'),
                'inputEmailLabel' => __('Email'),
                'ariaSaveProfileInformationButton' => __('Save your profile information'),
                'buttonSave' => __('Save'),
                'transitionSaved' => __('Saved.'),
                'updatePasswordTitle' => __('Update Password'),
                'updatePasswordLabel' => __('Ensure your account is using a long, random password to stay secure.'),
                'inputCurrentPasswordLabel' => __('Current Password'),
                'inputNewPasswordLabel' => __('New Password'),
                'inputConfirmPasswordLabel' => __('Confirm Password'),
                'ariaSaveUpdatedPasswordButton' => __('Save your updated password'),
                'deleteAccountTitle' => __('Delete Account'),
                'deleteAccountLabel' => __('Once your account is deleted, all of its resources and data will be permanently deleted.'),
                'ariaDeleteAccountButton' => __('Delete your account'),
                'modalConfirmingDeletionTitle' => __('Are you sure you want to delete your account?'),
                'modalConfirmingDeletionLabel' => __('Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.'),
                'inputPasswordLabel' => __('Password'),
                'buttonCancel' => __('Cancel')
            ],
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $customer = $request->user();
        $customer->company_name = ucfirst($customer->company_name);
        $customer->first_name = ucfirst($customer->first_name);
        $customer->last_name = ucfirst($customer->last_name);
        $customer->address = ucfirst($customer->address);
        $customer->city = ucfirst($customer->city);

        $customer->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        $user->cr_apps->each(function ($app) {
            $app->clearMediaCollection('posters');
        });

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
