export interface Employee {
    id?: number;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    passwordless?: string;
    logout?: boolean;
    fk_workstations_id?: number;
    created_at?: string;
    updated_at?: string;
}

export interface EmployeeProfileFormData {
    name: 'first_name' | 'last_name' | 'phone' | 'email';
    label: string;
    isFocused?: boolean;
    type?: string;
}
