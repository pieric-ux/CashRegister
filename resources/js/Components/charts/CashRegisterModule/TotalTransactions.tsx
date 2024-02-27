import { usePage } from '@inertiajs/react';
import { Svg } from '@/Components/ui/svg/Svg';
import { useTranslation } from 'react-i18next';
import { type Transaction } from '@/Shared/Types/TransactionTypes';
import { type CashRegister } from '@/Shared/Types/CashRegisterTypes';
import { type PaymentMethod } from '@/Shared/Types/PaymentMethodsTypes';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card/card';

interface PageProps extends InertiaPageProps {
    cashRegisterModule: CashRegister & {
        cr_payment_methods: (PaymentMethod & { cr_transactions: Transaction[] })[];
    };
}

export default function TotalTransactions() {
    const { t } = useTranslation();
    const { cashRegisterModule } = usePage<PageProps>().props;

    const getCountTransactions = cashRegisterModule.cr_payment_methods.reduce(
        (count, paymentMethod) => count + paymentMethod.cr_transactions.length,
        0,
    );
    return (
        <Card>
            <CardHeader>
                <div className='flex items-center justify-between'>
                    <CardTitle>{t('Transactions')}</CardTitle>
                    <Svg type='transactions' variant='sideBar' />
                </div>
            </CardHeader>
            <CardContent>
                <div className='text-2xl font-bold'>{getCountTransactions}</div>
            </CardContent>
        </Card>
    );
}
