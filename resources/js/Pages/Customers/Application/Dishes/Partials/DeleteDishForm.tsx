import { useRef, useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Svg } from '@/Components/ui/svg/Svg';
import TextInput from '@/Components/TextInput';
import { useTranslation } from 'react-i18next';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import { Button } from '@/Components/ui/button/button';
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

export default function DeleteDishForm({ dish, className = '' }) {
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

        destroy(route('dishes.destroy', dish), {
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
                    <Button variant={'destructive'} size={'icon'} aria-label={t('Delete the dish')}>
                        <Svg type={'delete'} variant={'destructive'} />
                    </Button>
                </DialogTrigger>
                <DialogContent size={'2xl'}>
                    <DialogHeader>
                        <DialogTitle>{t('Are you sure you want to delete your dish?')}</DialogTitle>
                        <DialogDescription>
                            {t(
                                'Once your dish is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your dish.',
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
                                variant={'destructive'}
                                className='ml-3'
                                onClick={submit}
                                disabled={processing}
                                aria-label={t('Delete the dish')}
                            >
                                {t('Delete Dish')}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </section>
    );
}
