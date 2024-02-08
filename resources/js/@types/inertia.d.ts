import type ziggyRoute from 'ziggy-js';
import { type EmployeeAuth } from '@/Shared/Types/AuthTypes';
import { type Page, type PageProps, type Errors, type ErrorBag } from '@inertiajs/core';
import { type Customer } from '@/Shared/Types/CustomerTypes';

declare global {
    interface InertiaPageProps extends Page<PageProps> {
        errors: Errors & ErrorBag;
        customer: Customer;
        employeeAuth: EmployeeAuth;
        localization: string;
        ziggy: typeof ziggyRoute;
        [key: string]: unknown;
    }
}
