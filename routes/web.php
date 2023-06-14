<?php

use App\Http\Controllers\ApplicationsController;
use App\Http\Controllers\MediasController;
use App\Http\Controllers\ProfileController;
use Illuminate\Auth\Events\Verified;
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
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/apps', [ApplicationsController::class, 'index'])->name('applications.index');
    Route::post('/apps', [ApplicationsController::class, 'store'])->name('applications.store');
    Route::get('/apps/{app}', [ApplicationsController::class, 'show'])->name('applications.show');
    Route::patch('/apps/{app}', [ApplicationsController::class, 'update'])->name('applications.update');
    Route::delete('/apps/{app}', [ApplicationsController::class, 'destroy'])->name('applications.destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('upload-avatar', [MediasController::class, 'uploadAvatar'])->name('upload.avatar');
});

require __DIR__ . '/auth.php';
