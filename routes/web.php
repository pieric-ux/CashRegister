<?php

use App\Http\Controllers\CashregisterController;
use App\Http\Controllers\CashRegisterModulesController;
use App\Http\Controllers\CategoriesProductsController;
use App\Http\Controllers\DishesController;
use App\Http\Controllers\EmployeeProfilController;
use App\Http\Controllers\EmployeesController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TransactionsController;
use App\Http\Controllers\WorkstationsController;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Redirect;
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
        'canResetPassword' => Route::has('password.request'),
        'status' => session('status'),
    ]);
})->name('welcome');

Route::get('/language-switch/{locale}', function ($locale) {
    if (in_array($locale, config('app.locales'))) {
        App::setLocale($locale);
    }
    return Redirect::back();
});

Route::middleware(['auth:customer', 'verified'])->group(function () {

    Route::get('/dashboard', function () {
        return Inertia::render('Customers/Dashboard');
    })->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/apps', [CashRegisterModulesController::class, 'index'])->name('cashregisters.index');
    Route::post('/apps', [CashRegisterModulesController::class, 'store'])->name('cashregisters.store');
    Route::get('/apps/{module}', [CashRegisterModulesController::class, 'show'])->name('cashregisters.show');
    Route::patch('/apps/{module}', [CashRegisterModulesController::class, 'update'])->name('cashregisters.update');
    Route::delete('/apps/{module}', [CashRegisterModulesController::class, 'destroy'])->name('cashregisters.destroy');

    Route::get('/apps/{module}/workstations', [WorkstationsController::class, 'index'])->name('workstations.index');
    Route::post('/apps/{module}/workstations', [WorkstationsController::class, 'store'])->name('workstations.store');
    Route::patch('/workstations/{workstation}', [WorkstationsController::class, 'update'])->name('workstations.update');
    Route::delete('/workstations/{workstation}', [WorkstationsController::class, 'destroy'])->name('workstations.destroy');

    Route::get('/apps/{module}/employees', [EmployeesController::class, 'index'])->name('employees.index');
    Route::patch('/employees/update/{employee}', [EmployeesController::class, 'update'])->name('employees.update');
    Route::patch('/employees/update', [EmployeesController::class, 'updateDragAndDrop'])->name('employees.updateDragAndDrop');
    Route::delete('/employees/{employee?}', [EmployeesController::class, 'destroy'])->name('employees.destroy');

    Route::get('/apps/{module}/categories-products', [CategoriesProductsController::class, 'index'])->name('categories.index');
    Route::post('/apps/{module}/categories-products', [CategoriesProductsController::class, 'store'])->name('categories.store');
    Route::patch('/categories-products/update/{category}', [CategoriesProductsController::class, 'update'])->name('categories.update');
    Route::patch('/categories-products/update', [CategoriesProductsController::class, 'updateDragAndDrop'])->name('categories.updateDragAndDrop');
    Route::delete('/categories-products/{category}', [CategoriesProductsController::class, 'destroy'])->name('categories.destroy');

    Route::get('/apps/{module}/dishes', [DishesController::class, 'index'])->name('dishes.index');
    Route::post('/apps/{module}/dishes', [DishesController::class, 'store'])->name('dishes.store');
    Route::patch('/apps/dishes/update/{dish}', [DishesController::class, 'update'])->name('dishes.update');
    Route::delete('/dishes/{dish?}', [DishesController::class, 'destroy'])->name('dishes.destroy');

    Route::get('/apps/{module}/products', [ProductsController::class, 'index'])->name('products.index');
    Route::post('/apps/{module}/products', [ProductsController::class, 'store'])->name('products.store');
    Route::patch('/apps/products/update/{product}', [ProductsController::class, 'update'])->name('products.update');
    Route::patch('/apps/products/update', [ProductsController::class, 'updateDragAndDrop'])->name('products.updateDragAndDrop');
    Route::delete('/products/{product?}', [ProductsController::class, 'destroy'])->name('products.destroy');

    Route::get('/apps/{module}/transactions', [TransactionsController::class, 'index'])->name('transactions.index');
    Route::delete('/transactions/{transaction?}', [TransactionsController::class, 'destroy'])->name('transactions.destroy');

    Route::post('/avatar-upload', [MediaController::class, 'uploadAvatar'])->name('avatar.upload');
    Route::post('/poster-upload', [MediaController::class, 'uploadPoster'])->name('poster.upload');
    Route::post('/picture-product-upload', [MediaController::class, 'uploadProductPicture'])->name('picture-product.upload');
    Route::post('/picture-dish-upload', [MediaController::class, 'uploadDishPicture'])->name('picture-dish.upload');
});

Route::middleware(['auth:employee', 'logout'])->group(function () {
    Route::get('/cashregister', [CashregisterController::class, 'index'])->name('cashregister.index');
    Route::post('/cashregister/payment', [CashregisterController::class, 'store'])->name('cashregister.store');

    Route::get('employee/profile', [EmployeeProfilController::class, 'index'])->name('employee-profil.index');

    Route::post('/avatar-employee-upload', [MediaController::class, 'uploadEmployeeAvatar'])->name('avatar-employee.upload');
});

require __DIR__ . '/customerAuth.php';
require __DIR__ . '/employeeAuth.php';
