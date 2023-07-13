<?php

use App\Http\Controllers\ApplicationsController;
use App\Http\Controllers\EmployeesController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WorkstationsController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('welcome');

Route::middleware(['auth:customer', 'verified'])->group(function () {

    Route::get('/dashboard', function () {
        return Inertia::render('Customers/Dashboard');
    })->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/apps', [ApplicationsController::class, 'index'])->name('applications.index');
    Route::post('/apps', [ApplicationsController::class, 'store'])->name('applications.store');
    Route::get('/apps/{app}', [ApplicationsController::class, 'show'])->name('applications.show');
    Route::patch('/apps/{app}', [ApplicationsController::class, 'update'])->name('applications.update');
    Route::delete('/apps/{app}', [ApplicationsController::class, 'destroy'])->name('applications.destroy');

    Route::get('/apps/{app}/workstations', [WorkstationsController::class, 'index'])->name('workstations.index');
    Route::post('/apps/{app}/workstations', [WorkstationsController::class, 'store'])->name('workstations.store');
    Route::patch('/workstations/{workstation}', [WorkstationsController::class, 'update'])->name('workstations.update');
    Route::delete('/workstations/{workstation}', [WorkstationsController::class, 'destroy'])->name('workstations.destroy');

    Route::get('/apps/{app}/employees', [EmployeesController::class, 'index'])->name('employees.index');
    Route::patch('/employees/{employee}', [EmployeesController::class, 'update'])->name('employees.update');
    Route::delete('/employees/{employee}', [EmployeesController::class, 'destroy'])->name('employees.destroy');

    Route::post('/avatar-upload', [MediaController::class, 'uploadAvatar'])->name('avatar.upload');
    Route::post('/poster-upload', [MediaController::class, 'uploadPoster'])->name('poster.upload');
});

Route::middleware(['auth:employee', 'logout'])->group(function () {
    Route::get('/test', function () {
        return Inertia::render('Employees/Test');
    });
});

require __DIR__ . '/customerAuth.php';
require __DIR__ . '/employeeAuth.php';
