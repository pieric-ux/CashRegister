export interface CartItem {
    id: number | null;
    quantity: number;
    name: string;
    unit?: string;
    client_price: number;
    picture_url?: string;
    type?: string;
}

export interface Cart {
    items: CartItem[];
    total: number;
}
