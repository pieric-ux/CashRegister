import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Modal from '@/Components/Modal';
import { useTranslation } from 'react-i18next';
import { Button } from '@/Components/ui/button';
import { Svg } from '@/Components/ui/svg/Svg';

export default function UpdateEmployeeForm({ employee, className = '' }) {
    const { t } = useTranslation();

    const [openingModal, setOpeningModal] = useState(false);
    const [showErrors, setShowErrors] = useState(false);

    const { data, setData, patch, processing, errors } = useForm({
        first_name: employee.first_name ?? '',
        last_name: employee.last_name ?? '',
        phone: employee.phone ?? '',
        email: employee.email ?? '',
    });

    const openModal = () => {
        setOpeningModal(true);
    };

    const closeModal = () => {
        setOpeningModal(false);
        setData({
            first_name: employee.first_name ?? '',
            last_name: employee.last_name ?? '',
            phone: employee.phone ?? '',
            email: employee.email ?? '',
        });
        setShowErrors(false);
    };

    useEffect(() => {
        setData({
            first_name: employee.first_name ?? '',
            last_name: employee.last_name ?? '',
            phone: employee.phone ?? '',
            email: employee.email ?? '',
        });
    }, [employee]);

    const submit = (e) => {
        e.preventDefault();

        patch(route('employees.update', employee), {
            preserveScroll: true,
            onError: () => {
                setShowErrors(true);
            },
            onSuccess: () => closeModal(),
        });
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <Button size={'icon'} onClick={openModal} aria-label={t('Edit your employee')}>
                <Svg type={'edit'} />
            </Button>

            <Modal show={openingModal} onClose={closeModal}>
                <form onSubmit={submit} className='p-6'>
                    <h2 className='text-lg font-medium text-gray-900 dark:text-gray-100'>
                        {t('Edit Employee')}
                    </h2>

                    <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>
                        {t(
                            "Ready to update the employee? Fill out the form below with the required details and click the 'Save' button to apply the changes.",
                        )}
                    </p>

                    <div className='mt-6'>
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

                    <div className='mt-6'>
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

                    <div className='mt-6'>
                        <InputLabel htmlFor='phone' value={t('Phone')} />

                        <TextInput
                            id='phone'
                            name='phone'
                            className='mt-1 block w-3/4'
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                        />

                        <InputError className='mt-2' message={showErrors ? errors.phone : null} />
                    </div>

                    <div className='mt-6'>
                        <InputLabel htmlFor='email' value={t('Email')} />

                        <TextInput
                            id='email'
                            name='email'
                            className='mt-1 block w-3/4'
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                        />

                        <InputError className='mt-2' message={showErrors ? errors.email : null} />
                    </div>

                    <div className='mt-6 flex justify-end'>
                        <Button variant={'secondary'} onClick={closeModal}>
                            {t('Cancel')}
                        </Button>

                        <Button
                            className='ml-3'
                            disabled={processing}
                            aria-label={t('Edit your employee')}
                        >
                            {t('Save')}
                        </Button>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
