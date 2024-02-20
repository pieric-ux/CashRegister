import { useTranslation } from 'react-i18next';
import { Head, usePage } from '@inertiajs/react';
import { Card, CardHeader } from '@/Components/ui/card/card';
import { columns } from './Components/TransactionsTableColumns';
import { TransactionsTable } from './Components/TransactionsTable';
import { type Transaction } from '@/Shared/Types/TransactionTypes';
import { type CashRegister } from '@/Shared/Types/CashRegisterTypes';
import { type PaymentMethod } from '@/Shared/Types/PaymentMethodsTypes';
import { type DetailTransaction } from '@/Shared/Types/DetailTransactionTypes';
import CashRegisterConfigurationsLayout from '@/Components/layouts/Auth/Customer/CashRegisterConfigurationsLayout';

interface PageProps extends InertiaPageProps {
    cashRegisterModule: CashRegister & {
        cr_transactions: Transaction[] & {
            cr_details_transactions?: DetailTransaction[];
            cr_payment_methods?: PaymentMethod[];
        };
    };
}

export default function Index(): JSX.Element {
    const { t } = useTranslation();

    const { cashRegisterModule } = usePage<PageProps>().props;
    const transactions = cashRegisterModule.cr_transactions;

    return (
        <>
            <Head title={cashRegisterModule.name} />
            <Card>
                <CardHeader>
                    <TransactionsTable
                        columns={columns}
                        data={transactions}
                        filterPlaceholder={t('Search transactions')}
                        textNoData={t('No transactions found.')}
                    />
                </CardHeader>
            </Card>
        </>
    );
}

Index.layout = (page: JSX.Element) => <CashRegisterConfigurationsLayout children={page} />;
