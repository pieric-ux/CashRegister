import { type Media } from '@/Shared/Types/MediaTypes';

export interface CashRegister {
    id?: number;
    name: string;
    slug?: string;
    description: string;
    start_date: string;
    end_date: string;
    location: string;
    website: string;
    fk_customer_id?: number;
    created_at?: string;
    updated_at?: string;
    media: Media[];
}

export interface CashRegisterInfosFormDatas {
    name: 'name' | 'description' | 'start_date' | 'end_date' | 'location' | 'website';
    label: string;
    isFocused?: boolean;
    type?: string;
    placeholder?: string;
    pattern?: string;
}
