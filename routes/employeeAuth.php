<?php

use App\Http\Controllers\EmployeeAuth\RegisteredEmployeeController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('/apps/{app}/employees', [RegisteredEmployeeController::class, 'store'])->name('employees.register');
});
