import { type Media } from './MediaTypes';

export interface PaymentMethod {
    id: number;
    name: string;
    created_at?: string;
    updated_at?: string;
    media: Media[];
}
