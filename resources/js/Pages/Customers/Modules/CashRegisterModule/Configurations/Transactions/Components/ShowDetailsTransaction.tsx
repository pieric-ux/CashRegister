import { useState } from 'react';
import { Svg } from '@/Components/ui/svg/Svg';
import { useTranslation } from 'react-i18next';
import { Button } from '@/Components/ui/button/button';
import { columns } from './DetailsTransactionsTableColumns';
import { type Transaction } from '@/Shared/Types/TransactionTypes';
import { DataTable } from '@/Components/ui/table/templates/table/DataTable';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogTrigger,
} from '@/Components/ui/dialog/dialog';

export default function ShowDetailsTransaction({
    transaction,
}: {
    transaction: Transaction;
}): JSX.Element {
    const { t } = useTranslation();

    const [open, setOpen] = useState(false);

    const closeDialog = (): void => {
        setOpen(false);
    };

    const data = transaction.cr_details_transactions;

    return (
        <section>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button size={'icon'} aria-label={t('Show details')}>
                        <Svg type={'view'} />
                    </Button>
                </DialogTrigger>
                <DialogContent size={'2xl'}>
                    <DataTable
                        className='mt-6'
                        columns={columns}
                        data={data}
                        withFilter={false}
                        withPagination={false}
                    />
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button
                                variant={'secondary'}
                                onClick={closeDialog}
                                className='self-end'
                            >
                                {t('Cancel')}
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </section>
    );
}
