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
        $sharedProps = [
            ...parent::share($request),
            'localization' => [
                'locale' => app()->getLocale(),
                'locales' => config('app.locales'),
            ],
            'ziggy' => fn() => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];

        $customer = $request->user('customer');
        if($customer) {
            $customer->getAvatarUrl();
            $sharedProps['customer'] = $customer;
        }

        $employee = $request->user('employee');
        if($employee) {
            $employee->getAvatarUrl();
            $sharedProps['employee'] = $employee;
        }

        return $sharedProps;
    }
}
