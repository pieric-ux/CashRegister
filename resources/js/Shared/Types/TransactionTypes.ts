import { type CashRegister } from '@/Shared/Types/CashRegisterTypes';
import { type PaymentMethod } from '@/Shared/Types/PaymentMethodsTypes';
import { type DetailTransaction } from '@/Shared/Types/DetailTransactionTypes';

export interface Transaction {
    id?: number;
    or_number: string;
    employee: string;
    workstation: string;
    total: number;
    fk_paymentMethods_id?: number;
    created_at?: string;
    updated_at?: string;
    cr_details_transactions: DetailTransaction[];
    cr_payment_methods?: PaymentMethod;
}

export interface TransactionBkndDatas {
    cashRegisterModule: CashRegister & {
        cr_transactions: Transaction[] & {
            cr_details_transactions?: DetailTransaction[];
            cr_payment_methods?: PaymentMethod[];
        };
    };
}
