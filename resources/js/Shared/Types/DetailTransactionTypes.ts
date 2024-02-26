export interface DetailTransaction {
    id?: number;
    quantity: number;
    item_name: string;
    unit: string;
    client_price: number;
    created_at?: string;
    updated_at?: string;
}
