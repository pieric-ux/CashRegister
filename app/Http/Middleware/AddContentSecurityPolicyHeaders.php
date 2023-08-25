<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Vite;
use Symfony\Component\HttpFoundation\Response;

class AddContentSecurityPolicyHeaders
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        $cspNonce = Vite::useCspNonce();

        $response->headers->set('Content-Security-Policy', "default-src 'self'; script-src 'self' 'nonce-$cspNonce'; style-src 'self' 'nonce-$cspNonce'; font-src 'self' https://fonts.bunny.net; img-src 'self' data:; connect-src 'self'; frame-src 'self'; frame-ancestors 'none'; media-src 'self'; object-src 'self'; manifest-src 'self'; prefetch-src 'self'; form-action 'self';");
        $response->headers->set('X-Frame-Options', 'SAMEORIGIN');
        $response->headers->set('X-Content-Type-Options', 'nosniff');

        return $response;
    }
}
