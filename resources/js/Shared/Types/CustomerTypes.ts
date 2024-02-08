import { type Media } from './MediaTypes';

export interface Customer {
    id?: number;
    company_name: string;
    first_name: string;
    last_name: string;
    address: string;
    city: string;
    npa: string;
    phone: string;
    email: string;
    email_verified_at: string;
    password: string;
    created_at?: string;
    updated_at?: string;
    media: Media[];
}

export interface CustomerProfileFormInput extends Partial<Customer> {
    password_confirmation: string;
}

export interface CustomerProfileFormDatas {
    name:
        | 'company_name'
        | 'first_name'
        | 'last_name'
        | 'address'
        | 'city'
        | 'npa'
        | 'phone'
        | 'email'
        | 'email_verified_at'
        | 'password'
        | 'password_confirmation';
    label: string;
    type?: string;
    autoComplete?: string;
    isFocused?: boolean;
    facultative?: boolean;
}

export interface CustomerProfileFormDatasObject {
    base: CustomerProfileFormDatas[];
    flex?: CustomerProfileFormDatas[];
    update?: CustomerProfileFormDatas[];
    end?: CustomerProfileFormDatas;
    create?: CustomerProfileFormDatas[];
}
