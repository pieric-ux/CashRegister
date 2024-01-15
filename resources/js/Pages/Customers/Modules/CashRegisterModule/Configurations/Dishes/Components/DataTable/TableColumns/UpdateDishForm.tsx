import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import Checkbox from '@/Components/Checkbox';
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

export default function UpdateDishForm({ dish, className = '' }) {
    const { t } = useTranslation();

    const [open, setOpen] = useState(false);
    const [showErrors, setShowErrors] = useState(false);

    const { data, setData, patch, processing, errors } = useForm({
        name: dish.name,
        unit: dish.unit,
        client_price: dish.client_price,
        cost_price: dish.cost_price,
        is_consigned: dish.is_consigned,
        is_SoldSeparately: dish.is_SoldSeparately,
    });

    useEffect(() => {
        if (!data.is_consigned) {
            setData('client_price', '');
        }
    }, [data.is_consigned]);

    useEffect(() => {
        setData({
            name: dish.name,
            unit: dish.unit,
            client_price: dish.client_price,
            cost_price: dish.cost_price,
            is_consigned: dish.is_consigned,
            is_SoldSeparately: dish.is_SoldSeparately,
        });
    }, [dish]);

    const closeDialog = () => {
        setData({
            name: dish.name,
            unit: dish.unit,
            client_price: dish.client_price,
            cost_price: dish.cost_price,
            is_consigned: dish.is_consigned,
            is_SoldSeparately: dish.is_SoldSeparately,
        });
        setShowErrors(false);
        setOpen(false);
    };

    const submit = (e) => {
        e.preventDefault();

        patch(route('dishes.update', dish), {
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
                    <Button size={'icon'} aria-label={t('Edit the dish')}>
                        <Svg type={'edit'} />
                    </Button>
                </DialogTrigger>
                <DialogContent size={'2xl'}>
                    <DialogHeader>
                        <DialogTitle>{t('Edit Dish')}</DialogTitle>
                        <DialogDescription>
                            {t(
                                "Ready to update the dish? Fill out the form below with the required details and click the 'Save' button to apply the changes.",
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
                                <InputLabel htmlFor='client_price' value={t('Client Price')} />

                                <TextInput
                                    id='client_price'
                                    name='client_price'
                                    className='mt-1 block w-3/4 disabled:cursor-not-allowed'
                                    value={data.client_price}
                                    onChange={(e) => setData('client_price', e.target.value)}
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
                                        onChange={(e) => setData('is_consigned', e.target.checked)}
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
                                aria-label={t('Edit the dish')}
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
