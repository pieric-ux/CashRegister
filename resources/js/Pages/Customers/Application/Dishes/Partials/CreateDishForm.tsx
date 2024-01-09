import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import Checkbox from '@/Components/Checkbox';
import TextInput from '@/Components/TextInput';
import { useTranslation } from 'react-i18next';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import { Button } from '@/Components/ui/button/button';
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card/card';
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

export default function CreateDishForm({ application, className = '' }) {
    const { t } = useTranslation();

    const [open, setOpen] = useState(false);
    const [showErrors, setShowErrors] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        unit: '',
        client_price: '',
        cost_price: '',
        is_consigned: true,
        is_SoldSeparately: false,
    });

    useEffect(() => {
        if (!data.is_consigned) {
            setData('client_price', '');
        }
    }, [data.is_consigned]);

    const closeDialog = () => {
        reset();
        setShowErrors(false);
        setOpen(false);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('dishes.store', application.slug), {
            preserveScroll: true,
            onSuccess: () => closeDialog(),
            onError: () => {
                setShowErrors(true);
            },
        });
    };
    return (
        <section className={className}>
            <Card>
                <CardHeader size={'xl'}>
                    <CardTitle>{t('Create a Dish')}</CardTitle>
                    <CardDescription>
                        {t(
                            "Don't have any dish yet? Looking to add another one? Click the 'Create' button to begin.",
                        )}
                    </CardDescription>
                </CardHeader>
                <CardFooter size={'xl'}>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button aria-label={t('Create your dish')}>{t('Create')}</Button>
                        </DialogTrigger>
                        <DialogContent size={'2xl'}>
                            <DialogHeader>
                                <DialogTitle>{t('Create Dish')}</DialogTitle>
                                <DialogDescription>
                                    {t(
                                        "Ready to create a new dish? Fill out the form below with the required details and hit the 'Create' button to get started.",
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
                                            value={data.name}
                                            isFocused={true}
                                            onChange={(e) => setData('name', e.target.value)}
                                        />

                                        <InputError
                                            className='mt-2'
                                            message={showErrors ? errors.name : null}
                                        />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor='unit' value={t('Unit')} />

                                        <TextInput
                                            id='unit'
                                            name='unit'
                                            className='mt-1 block w-3/4'
                                            value={data.unit}
                                            onChange={(e) => setData('unit', e.target.value)}
                                        />

                                        <InputError
                                            className='mt-2'
                                            message={showErrors ? errors.unit : null}
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor='client_price'
                                            value={t('Client Price')}
                                        />

                                        <TextInput
                                            id='client_price'
                                            name='client_price'
                                            className='mt-1 block w-3/4 disabled:cursor-not-allowed'
                                            value={data.client_price}
                                            onChange={(e) =>
                                                setData('client_price', e.target.value)
                                            }
                                            disabled={!data.is_consigned}
                                        />

                                        <InputError
                                            className='mt-2'
                                            message={showErrors ? errors.client_price : null}
                                        />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor='cost_price' value={t('Cost Price')} />

                                        <TextInput
                                            id='cost_price'
                                            name='cost_price'
                                            className='mt-1 block w-3/4'
                                            value={data.cost_price}
                                            onChange={(e) => setData('cost_price', e.target.value)}
                                        />

                                        <InputError
                                            className='mt-2'
                                            message={showErrors ? errors.cost_price : null}
                                        />
                                    </div>

                                    <div>
                                        <label className='flex items-center'>
                                            <Checkbox
                                                name='is_consigned'
                                                checked={data.is_consigned}
                                                onChange={(e) =>
                                                    setData('is_consigned', e.target.checked)
                                                }
                                            />
                                            <span className='ml-2 text-sm text-gray-600 dark:text-gray-400'>
                                                {t('Consigned')}
                                            </span>
                                        </label>
                                        <InputError
                                            className='mt-2'
                                            message={showErrors ? errors.is_consigned : null}
                                        />
                                    </div>

                                    <div>
                                        <label className='flex items-center'>
                                            <Checkbox
                                                name='is_SoldSeparately'
                                                checked={data.is_SoldSeparately}
                                                onChange={(e) =>
                                                    setData('is_SoldSeparately', e.target.checked)
                                                }
                                            />
                                            <span className='ml-2 text-sm text-gray-600 dark:text-gray-400'>
                                                {t('Sold Separately')}
                                            </span>
                                        </label>
                                        <InputError
                                            className='mt-2'
                                            message={showErrors ? errors.is_SoldSeparately : null}
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
                                        aria-label={t('Create your dish')}
                                    >
                                        {t('Create')}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </CardFooter>
            </Card>
        </section>
    );
}
