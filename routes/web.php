<?php

use App\Http\Controllers\ApplicationsController;
use App\Http\Controllers\CategoriesProductsController;
use App\Http\Controllers\EmployeesController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WorkstationsController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;
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

Route::get('/language-switch/{locale}', function ($locale) {
    if (in_array($locale, config('app.locales'))) {
        Session::put('locale', $locale);
        App::setLocale($locale);
    }

    return Redirect::back();
});

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'translations' => [
            'login' => __('Log in'),
            'register' => __('Register'),
            'dashboard' => __('Dashboard'),
        ],
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('welcome');

Route::middleware(['auth:customer', 'verified'])->group(function () {

    Route::get('/dashboard', function () {
        return Inertia::render('Customers/Dashboard', [
            'translations' => [
                'welcome' => __('Welcome'),
            ],
        ]);
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
    Route::patch('/employees/update/{employee}', [EmployeesController::class, 'update'])->name('employees.update');
    Route::patch('/employees/update', [EmployeesController::class, 'updateDragAndDrop'])->name('employees.updateDragAndDrop');
    Route::delete('/employees/{employee}', [EmployeesController::class, 'destroy'])->name('employees.destroy');

    Route::get('/apps/{app}/categories-products', [CategoriesProductsController::class, 'index'])->name('categories.index');
    Route::post('/apps/{app}/categories-products', [CategoriesProductsController::class, 'store'])->name('categories.store');
    Route::patch('/categories-products/update/{category}', [CategoriesProductsController::class, 'update'])->name('categories.update');
    Route::patch('/categories-products/update', [CategoriesProductsController::class, 'updateDragAndDrop'])->name('categories.updateDragAndDrop');
    Route::delete('/categories-products/{category}', [CategoriesProductsController::class, 'destroy'])->name('categories.destroy');

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
