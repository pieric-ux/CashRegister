import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
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

export default function UpdateEmployeeForm({ employee, className = '' }) {
    const { t } = useTranslation();

    const [open, setOpen] = useState(false);
    const [showErrors, setShowErrors] = useState(false);

    const { data, setData, patch, processing, errors, reset } = useForm({
        first_name: employee.first_name ?? '',
        last_name: employee.last_name ?? '',
        phone: employee.phone ?? '',
        email: employee.email ?? '',
    });

    useEffect(() => {
        setData({
            first_name: employee.first_name ?? '',
            last_name: employee.last_name ?? '',
            phone: employee.phone ?? '',
            email: employee.email ?? '',
        });
    }, [employee]);

    const closeDialog = () => {
        setData({
            first_name: employee.first_name ?? '',
            last_name: employee.last_name ?? '',
            phone: employee.phone ?? '',
            email: employee.email ?? '',
        });
        setShowErrors(false);
        setOpen(false);
    };

    const submit = (e) => {
        e.preventDefault();

        patch(route('employees.update', employee), {
            preserveScroll: true,
            onSuccess: () => closeDialog(),
            onError: () => {
                setShowErrors(true);
            },
        });
    };

    return (
        <section className={className}>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button size={'icon'} aria-label={t('Edit your employee')}>
                        <Svg type={'edit'} />
                    </Button>
                </DialogTrigger>
                <DialogContent size={'2xl'}>
                    <DialogHeader>
                        <DialogTitle>{t('Edit Employee')}</DialogTitle>
                        <DialogDescription>
                            {t(
                                "Ready to update the employee? Fill out the form below with the required details and click the 'Save' button to apply the changes.",
                            )}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={submit}>
                        <fieldset className='space-y-6'>
                            <div>
                                <InputLabel htmlFor='first_name' value={t('First Name')} />

                                <TextInput
                                    id='first_name'
                                    name='first_name'
                                    className='mt-1 block w-3/4'
                                    value={data.first_name}
                                    isFocused={true}
                                    onChange={(e) => setData('first_name', e.target.value)}
                                />

                                <InputError
                                    className='mt-2'
                                    message={showErrors ? errors.first_name : null}
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor='last_name' value={t('Last Name')} />

                                <TextInput
                                    id='last_name'
                                    name='last_name'
                                    className='mt-1 block w-3/4'
                                    value={data.last_name}
                                    onChange={(e) => setData('last_name', e.target.value)}
                                />

                                <InputError
                                    className='mt-2'
                                    message={showErrors ? errors.last_name : null}
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor='phone' value={t('Phone')} />

                                <TextInput
                                    id='phone'
                                    name='phone'
                                    className='mt-1 block w-3/4'
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                />

                                <InputError
                                    className='mt-2'
                                    message={showErrors ? errors.phone : null}
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor='email' value={t('Email')} />

                                <TextInput
                                    id='email'
                                    name='email'
                                    className='mt-1 block w-3/4'
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                />

                                <InputError
                                    className='mt-2'
                                    message={showErrors ? errors.email : null}
                                />
                            </div>
                        </fieldset>

                        <DialogFooter className='mt-6 flex justify-end'>
                            <DialogClose asChild>
                                <Button variant={'secondary'} onClick={closeDialog}>
                                    {t('Cancel')}
                                </Button>
                            </DialogClose>

                            <Button
                                className='ml-3'
                                onClick={submit}
                                disabled={processing}
                                aria-label={t('Edit your employee')}
                            >
                                {t('Save')}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </section>
    );
}
