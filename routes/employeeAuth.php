<?php

use App\Http\Controllers\EmployeeAuth\EmployeeLoginController;
use App\Http\Controllers\EmployeeAuth\EmployeeRegenerateActivationController;
use App\Http\Controllers\EmployeeAuth\EmployeeRegisterController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('/apps/{module}/login/{code?}', [EmployeeLoginController::class, 'create'])->name('employees.login');
    Route::post('/apps/{module}/login', [EmployeeLoginController::class, 'store']);
});

Route::middleware('auth:employee')->group(function () {
    Route::post('/employee/logout', [EmployeeLoginController::class, 'destroy'])->name('employees.logout');
});

Route::middleware(['auth:customer', 'verified'])->group(function () {
    Route::post('/apps/{module}/employees', [EmployeeRegisterController::class, 'store'])->name('employees.register');
    Route::patch('/regenerate-passwordless/{employee}', [EmployeeRegenerateActivationController::class, 'update'])->name('employees.regenerate');
});
