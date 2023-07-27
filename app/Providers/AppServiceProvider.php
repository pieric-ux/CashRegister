<?php

namespace App\Providers;

use Illuminate\Support\Facades\App;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share('GlobalTranslations', function () {
            return [
                'locale' => App::getLocale(),
                'locales' => config('app.locales'),
                'dashboard' => __('Dashboard'),
                'profile' => __('Profile'),
                'applications' => __('Applications'),
                'logout' => __('Logout'),
                'home' => __('Home'),
                'appDashboard' => __('App Dashboard'),
                'employees' => __('Employees'),
                'workstations' => __('Workstations'),
                'categories' => __('Categories'),
            ];
        });
    }
}
