import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Modal from '@/Components/Modal';
import { useTranslation } from 'react-i18next';
import { Button } from '@/Components/ui/button';
import clsx from 'clsx';
import { Svg } from '@/Components/ui/svg/Svg';

export default function UpdateWorkstationForm({ workstation, className = '' }) {
    const { t } = useTranslation();

    const [openingModal, setOpeningModal] = useState(false);
    const [showErrors, setShowErrors] = useState(false);

    const { data, setData, patch, processing, errors } = useForm({
        name: workstation.name,
    });

    const openModal = () => {
        setOpeningModal(true);
    };

    const closeModal = () => {
        setOpeningModal(false);
        setData({
            name: workstation.name,
        });
        setShowErrors(false);
    };

    useEffect(() => {
        setData({
            name: workstation.name,
        });
    }, [workstation]);

    const submit = (e) => {
        e.preventDefault();

        patch(route('workstations.update', workstation), {
            preserveScroll: true,
            onError: () => {
                setShowErrors(true);
            },
            onSuccess: () => closeModal(),
        });
    };

    return (
        <section className={clsx('space-y-6', className)}>
            <Button size={'icon'} onClick={openModal} aria-label={t('Edit the workstation')}>
                <Svg type={'edit'} />
            </Button>

            <Modal show={openingModal} onClose={closeModal}>
                <form onSubmit={submit} className='p-6'>
                    <h2 className='text-lg font-medium text-gray-900 dark:text-gray-100'>
                        {t('Edit Workstation')}
                    </h2>

                    <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>
                        {t(
                            "Ready to update the workstation? Fill out the form below with the required details and click the 'Save' button to apply the changes.",
                        )}
                    </p>

                    <div className='mt-6'>
                        <InputLabel htmlFor='name' value={t('Name')} />

                        <TextInput
                            id='name'
                            name='name'
                            className='mt-1 block w-3/4'
                            value={data.name}
                            isFocused={true}
                            onChange={(e) => setData('name', e.target.value)}
                        />

                        <InputError className='mt-2' message={showErrors ? errors.name : null} />
                    </div>

                    <div className='mt-6 flex justify-end'>
                        <Button variant={'secondary'} onClick={closeModal}>
                            {t('Cancel')}
                        </Button>

                        <Button
                            className='ml-3'
                            disabled={processing}
                            aria-label={t('Edit the workstation')}
                        >
                            {t('Save')}
                        </Button>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
