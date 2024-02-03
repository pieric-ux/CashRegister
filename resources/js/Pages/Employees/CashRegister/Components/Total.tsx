import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader } from '@/Components/ui/card/card';
import useCurrencyFormatter from '@/Hooks/useCurrencyFormatter';
import { CashRegisterContext } from '@/Context/CashRegisterContext';

export default function Total(): JSX.Element {
    const { t } = useTranslation();

    const { cart } = useContext(CashRegisterContext);

    const formatted = useCurrencyFormatter(cart.total);

    return (
        <Card variant={'secondary'}>
            <CardHeader variant={'flex-row'}>
                <span className='mr-2 text-xl font-medium sm:text-2xl'>{t('Total')}:</span>
                <span className='text-xl font-bold sm:text-2xl'>{formatted}</span>
            </CardHeader>
        </Card>
    );
}
