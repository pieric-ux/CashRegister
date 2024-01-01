<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $customer = $request->user('customer');
        $customerAuth = [
            'customer' => $customer,
            'avatarPath' => optional($customer)->getAvatarUrl(),
        ];

        $employee = $request->user('employee');
        $employeeAuth = [
            'employee' => $employee,
            'avatarPath' => optional($employee)->getAvatarUrl(),
        ];

        return [
            ...parent::share($request),
            'customerAuth' => $customerAuth,
            'employeeAuth' => $employeeAuth,
            'ziggy' => fn() => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];
    }
}
