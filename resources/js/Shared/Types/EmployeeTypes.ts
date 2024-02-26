import { type Media } from '@/Shared/Types/MediaTypes';

export interface Employee {
    id?: number;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    passwordless?: string;
    created_at?: string;
    updated_at?: string;
    media: Media[];
}

export interface EmployeeProfileFormDatas {
    name: 'first_name' | 'last_name' | 'phone' | 'email';
    label: string;
    isFocused?: boolean;
    type?: string;
}
