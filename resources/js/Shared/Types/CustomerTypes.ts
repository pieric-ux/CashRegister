export interface Customer {
    id: number;
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
}

export interface CustomerProfileFormInput extends Partial<Customer> {
    password_confirmation: string;
}

export interface CustomerProfileFormData {
    name:
        | 'id'
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

export interface CustomerProfileFormDataObject {
    base: CustomerProfileFormData[];
    flex?: CustomerProfileFormData[];
    update?: CustomerProfileFormData[];
    end?: CustomerProfileFormData;
    create?: CustomerProfileFormData[];
}