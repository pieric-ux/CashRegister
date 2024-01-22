import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader } from '@/Components/ui/card/card';
import { columns } from './Components/TransactionsTableColumns';
import { DataTable } from '@/Components/ui/table/templates/table/DataTable';
import { type TransactionBkndDatas } from '@/Shared/Types/TransactionTypes';
import CashRegisterConfigurationsLayout from '@/Components/layouts/Auth/Customer/CashRegisterConfigurationsLayout';

export default function Index({ bkndDatas }: { bkndDatas: TransactionBkndDatas }): JSX.Element {
    const { t } = useTranslation();

    const { cashRegisterModule } = bkndDatas;
    const transactions = cashRegisterModule.cr_transactions;

    return (
        <CashRegisterConfigurationsLayout cashRegisterModule={cashRegisterModule}>
            <Head title={cashRegisterModule.name} />
            <div className='mx-auto max-w-7xl space-y-6 px-2 sm:px-6 lg:px-8'>
                <Card>
                    <CardHeader>
                        <DataTable
                            columns={columns}
                            data={transactions}
                            filterPlaceholder={t('Search transactions')}
                            textNoData={t('No transactions found.')}
                        />
                    </CardHeader>
                </Card>
            </div>
        </CashRegisterConfigurationsLayout>
    );
}
