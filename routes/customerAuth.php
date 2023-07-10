<?php

use App\Http\Controllers\CustomerAuth\CustomerConfirmablePasswordController;
use App\Http\Controllers\CustomerAuth\CustomerEmailVerificationNotificationController;
use App\Http\Controllers\CustomerAuth\CustomerEmailVerificationPromptController;
use App\Http\Controllers\CustomerAuth\CustomerLoginController;
use App\Http\Controllers\CustomerAuth\CustomerNewPasswordController;
use App\Http\Controllers\CustomerAuth\CustomerPasswordController;
use App\Http\Controllers\CustomerAuth\CustomerPasswordResetLinkController;
use App\Http\Controllers\CustomerAuth\CustomerRegisterController;
use App\Http\Controllers\CustomerAuth\CustomerVerifyEmailController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('register', [CustomerRegisterController::class, 'create'])->name('customers.register');

    Route::post('register', [CustomerRegisterController::class, 'store']);

    Route::get('login', [CustomerLoginController::class, 'create'])->name('customers.login');

    Route::post('login', [CustomerLoginController::class, 'store']);

    Route::get('forgot-password', [CustomerPasswordResetLinkController::class, 'create'])->name('password.request');

    Route::post('forgot-password', [CustomerPasswordResetLinkController::class, 'store'])->name('password.email');

    Route::get('reset-password/{token}', [CustomerNewPasswordController::class, 'create'])->name('password.reset');

    Route::post('reset-password', [CustomerNewPasswordController::class, 'store'])->name('password.store');
});

Route::middleware('auth:customer')->group(function () {
    Route::get('verify-email', CustomerEmailVerificationPromptController::class)->name('verification.notice');

    Route::get('verify-email/{id}/{hash}', CustomerVerifyEmailController::class)->middleware(['signed', 'throttle:6,1'])->name('verification.verify');

    Route::post('email/verification-notification', [CustomerEmailVerificationNotificationController::class, 'store'])->middleware('throttle:6,1')->name('verification.send');

    Route::get('confirm-password', [CustomerConfirmablePasswordController::class, 'show'])->name('password.confirm');

    Route::post('confirm-password', [CustomerConfirmablePasswordController::class, 'store']);

    Route::put('password', [CustomerPasswordController::class, 'update'])->name('password.update');

    Route::post('logout', [CustomerLoginController::class, 'destroy'])->name('logout');
});
