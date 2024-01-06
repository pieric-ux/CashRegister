import { useRef, useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/Components/ui/button';
import { Svg } from '@/Components/ui/svg/Svg';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/ui/dialog/dialog';

export default function DeleteTransactionForm({ transaction, className = '' }) {
    const { t } = useTranslation();

    const [open, setOpen] = useState(false);
    const [showErrors, setShowErrors] = useState(false);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        errors,
        reset,
    } = useForm({
        password: '',
    });

    const passwordInput = useRef();

    const closeDialog = () => {
        reset();
        setShowErrors(false);
        setOpen(false);
    };

    const submit = (e) => {
        e.preventDefault();

        destroy(route('transactions.destroy', transaction), {
            preserveScroll: true,
            onSuccess: () => closeDialog(),
            onError: () => {
                setShowErrors(true);
                passwordInput.current.focus();
            },
        });
    };

    return (
        <section className={className}>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button
                        variant={'destructive'}
                        size={'icon'}
                        aria-label={t('Delete the transaction')}
                    >
                        <Svg type={'delete'} variant={'destructive'} />
                    </Button>
                </DialogTrigger>
                <DialogContent size={'2xl'}>
                    <DialogHeader>
                        <DialogTitle>
                            {t('Are you sure you want to delete your transaction?')}
                        </DialogTitle>
                        <DialogDescription>
                            {t(
                                'Once your transaction is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your transaction.',
                            )}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={submit}>
                        <fieldset>
                            <InputLabel
                                htmlFor='password'
                                value={t('Password')}
                                className='sr-only'
                            />

                            <TextInput
                                id='password'
                                type='password'
                                name='password'
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className='mt-1 block w-3/4'
                                isFocused
                                placeholder={t('Password')}
                            />

                            <InputError
                                className='mt-2'
                                message={showErrors ? errors.password : null}
                            />
                        </fieldset>

                        <DialogFooter className='mt-6 flex justify-end'>
                            <DialogClose asChild>
                                <Button variant={'secondary'} onClick={closeDialog}>
                                    {t('Cancel')}
                                </Button>
                            </DialogClose>

                            <Button
                                className='ml-3'
                                variant={'destructive'}
                                onClick={submit}
                                disabled={processing}
                                aria-label={t('Delete the transaction')}
                            >
                                {t('Delete Transaction')}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </section>
    );
}
