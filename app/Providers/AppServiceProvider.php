<?php

namespace App\Providers;

use Illuminate\Support\Facades\App;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;
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
        // Share localization data with Inertia.js
        Inertia::share('localization', function () {
            return [
                'locale' => App::getLocale(),
                'locales' => config('app.locales'),
            ];
        });
        // Default configuration for password rules
        Password::defaults(function () {
            $rule = Password::min(8);

            // If the application is in production, use stricter rules
            return $this->app->isProduction()
                ? $rule->min(12)->mixedCase()->symbols()->uncompromised()
                : $rule;
        });
    }
}
