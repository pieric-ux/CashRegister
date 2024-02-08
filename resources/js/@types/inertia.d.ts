import type ziggyRoute from 'ziggy-js';
import { type Customer } from '@/Shared/Types/CustomerTypes';
import { type Employee } from '@/Shared/Types/EmployeeTypes';
import { type Page, type PageProps, type Errors, type ErrorBag } from '@inertiajs/core';

declare global {
    interface InertiaPageProps extends Page<PageProps> {
        errors: Errors & ErrorBag;
        customer: Customer;
        employee: Employee;
        localization: string;
        ziggy: typeof ziggyRoute;
        [key: string]: unknown;
    }
}
