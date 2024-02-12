export interface Transaction {
    id?: number;
    or_number: string;
    employee: string;
    workstation: string;
    total: number;
    fk_paymentMethods_id?: number;
    created_at?: string;
    updated_at?: string;
}
