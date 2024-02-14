import { useState } from 'react';
import { type Transaction } from '@/Shared/Types/TransactionTypes';
import ActionDialogButton from '@/Components/generic/ActionDialogButton';
import ConfirmDeleteForm from '@/Components/forms/Auth/ConfirmDeleteForm';
import { deleteTransactionDatas } from '@/Shared/Datas/Configs/Transactions/DeleteTransactionDatas';

interface DeleteTransactionProps {
    transaction: Transaction;
}

export default function DeleteTransaction({ transaction }: DeleteTransactionProps): JSX.Element {
    const [open, setOpen] = useState(false);

    const closeDialog = (): void => {
        setOpen(false);
    };

    return (
        <section>
            <ActionDialogButton datas={deleteTransactionDatas} open={open} setOpen={setOpen}>
                <ConfirmDeleteForm
                    route={route('transactions.destroy', transaction.id)}
                    closeDialog={closeDialog}
                    datas={deleteTransactionDatas}
                />
            </ActionDialogButton>
        </section>
    );
}
