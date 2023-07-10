<?php

use App\Http\Controllers\EmployeeAuth\EmployeeLoginController;
use App\Http\Controllers\EmployeeAuth\EmployeeRegisterController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('/apps/{app}/login', [EmployeeLoginController::class, 'create'])->name('employees.login');
    Route::post('/apps/{app}/login', [EmployeeLoginController::class, 'store']);
});

Route::middleware('auth:employee')->group(function () {
    Route::post('/employee/logout', [EmployeeLoginController::class, 'destroy'])->name('employees.logout');
});

Route::middleware(['auth:customer', 'verified'])->group(function () {
    Route::post('/apps/{app}/employees', [EmployeeRegisterController::class, 'store'])->name('employees.register');
});
