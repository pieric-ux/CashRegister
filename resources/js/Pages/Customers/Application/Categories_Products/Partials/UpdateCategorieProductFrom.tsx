import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { useTranslation } from 'react-i18next';
import { Button } from '@/Components/ui/button/button';
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

export default function UpdateCategorieProductForm({ category, className = '' }) {
    const { t } = useTranslation();

    const [open, setOpen] = useState(false);
    const [showErrors, setShowErrors] = useState(false);

    const { data, setData, patch, processing, errors, reset } = useForm({
        name: category.name,
    });

    useEffect(() => {
        setData({
            name: category.name,
        });
    }, [category]);

    const closeDialog = () => {
        setData({
            name: category.name,
        });
        setShowErrors(false);
        setOpen(false);
    };

    const submit = (e) => {
        e.preventDefault();

        patch(route('categories.update', category), {
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
                    <Button size={'icon'} aria-label={t('Edit the category of product')}>
                        <Svg type={'edit'} />
                    </Button>
                </DialogTrigger>
                <DialogContent size={'2xl'}>
                    <DialogHeader>
                        <DialogTitle>{t('Edit Category of product')}</DialogTitle>
                        <DialogDescription>
                            {t(
                                "Ready to update the category of product? Fill out the form below with the required details and click the 'Save' button to apply the changes.",
                            )}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={submit}>
                        <fieldset>
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
                                aria-label={t('Edit the category of product')}
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
