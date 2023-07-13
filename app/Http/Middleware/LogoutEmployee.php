<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class LogoutEmployee
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $employee = Auth::guard('employee')->user();

        if ($employee && $employee->logout == 1) {
            $employee->logout = false;
            $employee->save();

            Auth::guard('employee')->logout();
        }
        return $next($request);
    }
}
