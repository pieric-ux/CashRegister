<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $locale = $_COOKIE['i18next'] ?? null;
    
        if ($locale && in_array($locale, config('app.locales'))) {
            App::setLocale($locale);
        } else {
            $acceptLanguageHeader = $request->header(('Accept-Language'));
            
            $preferredLanguage = \Locale::acceptFromHttp($acceptLanguageHeader);

            if($preferredLanguage) {
                App::setLocale($preferredLanguage);
            } else {
                App::setLocale(config('app.fallback_locale'));
            }
        } 
        
        return $next($request);
    }
}
