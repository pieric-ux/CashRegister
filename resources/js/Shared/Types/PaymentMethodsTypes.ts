import { type Media } from './MediaTypes';

export interface PaymentMethod {
    id: number;
    name: string;
    fk_cr_modules_id?: number;
    created_at?: string;
    updated_at?: string;
    picture_url?: string;
    media: Media[];
}
