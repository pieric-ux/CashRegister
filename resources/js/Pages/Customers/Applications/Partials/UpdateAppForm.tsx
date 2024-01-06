import clsx from 'clsx';
import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
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

export default function UpdateAppForm({ application, className = '' }) {
    const { t } = useTranslation();

    const [open, setOpen] = useState(false);
    const [showErrors, setShowErrors] = useState(false);

    const { data, setData, patch, processing, errors, reset } = useForm({
        name: application.name,
        description: '',
        start_date: '',
        end_date: '',
        location: '',
        website: '',
    });

    useEffect(() => {
        setData({
            name: application.name ?? '',
            description: application.description ?? '',
            start_date: application.start_date ?? '',
            end_date: application.end_date ?? '',
            location: application.location ?? '',
            website: application.website ?? '',
        });
    }, [application]);

    const closeDialog = () => {
        setData({
            name: application.name,
            description: application.description,
            start_date: application.start_date,
            end_date: application.end_date,
            location: application.location,
            website: application.website,
        });
        setShowErrors(false);
        setOpen(false);
    };

    const submit = (e) => {
        e.preventDefault();

        patch(route('applications.update', application.slug), {
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
                    <Button size={'icon'} aria-label={t('Edit your app')}>
                        <Svg type={'edit'} />
                    </Button>
                </DialogTrigger>
                <DialogContent size={'2xl'}>
                    <DialogHeader>
                        <DialogTitle>{t('Edit App')}</DialogTitle>
                        <DialogDescription>
                            {t(
                                "Ready to update the application? Fill out the form below with the required details and click the 'Save' button to apply the changes.",
                            )}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={submit}>
                        <fieldset className='space-y-6'>
                            <div>
                                <InputLabel htmlFor='name' value={t('Name')} />

                                <TextInput
                                    id='name'
                                    name='name'
                                    className='mt-1 block w-3/4'
                                    value={data.name ?? ''}
                                    isFocused={true}
                                    onChange={(e) => setData('name', e.target.value)}
                                />

                                <InputError
                                    className='mt-2'
                                    message={showErrors ? errors.name : null}
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor='description' value={t('Description')} />

                                <textarea
                                    id='description'
                                    name='description'
                                    className={clsx(
                                        'mt-1 block w-3/4 rounded-md border-gray-300 shadow-sm transition duration-300 ease-linear',
                                        'focus:border-sky-500 focus:ring-sky-500',

                                        'dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300',
                                        'dark:focus:border-sky-600 dark:focus:ring-sky-600',
                                    )}
                                    rows={5}
                                    value={data.description ?? ''}
                                    onChange={(e) => setData('description', e.target.value)}
                                />

                                <InputError
                                    className='mt-2'
                                    message={showErrors ? errors.description : null}
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor='start_date' value={t('Start Date')} />

                                <TextInput
                                    id='start_date'
                                    name='start_date'
                                    type='date'
                                    className='mt-1 w-3/4'
                                    value={data.start_date ?? ''}
                                    onChange={(e) => setData('start_date', e.target.value)}
                                />

                                <InputError
                                    className='mt-2'
                                    message={showErrors ? errors.start_date : null}
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor='end_date' value={t('End Date')} />

                                <TextInput
                                    id='end_date'
                                    name='end_date'
                                    type='date'
                                    className='mt-1 w-3/4'
                                    value={data.end_date ?? ''}
                                    onChange={(e) => setData('end_date', e.target.value)}
                                />

                                <InputError
                                    className='mt-2'
                                    message={showErrors ? errors.end_date : null}
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor='location' value={t('Location')} />

                                <TextInput
                                    id='location'
                                    name='location'
                                    className='mt-1 block w-3/4'
                                    value={data.location ?? ''}
                                    onChange={(e) => setData('location', e.target.value)}
                                />

                                <InputError
                                    className='mt-2'
                                    message={showErrors ? errors.location : null}
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor='website' value={t('Website')} />

                                <TextInput
                                    id='website'
                                    name='website'
                                    placeholder='https://'
                                    pattern='https://.*'
                                    className='mt-1 block w-3/4'
                                    value={data.website ?? ''}
                                    onChange={(e) => setData('website', e.target.value)}
                                />

                                <InputError
                                    className='mt-2'
                                    message={showErrors ? errors.website : null}
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
                                aria-label={t('Edit your app')}
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
