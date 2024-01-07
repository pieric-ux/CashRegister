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

export default function UpdateWorkstationForm({ workstation, className = '' }) {
    const { t } = useTranslation();

    const [open, setOpen] = useState(false);
    const [showErrors, setShowErrors] = useState(false);

    const { data, setData, patch, processing, errors } = useForm({
        name: workstation.name,
    });

    useEffect(() => {
        setData({
            name: workstation.name,
        });
    }, [workstation]);

    const closeDialog = () => {
        setData({
            name: workstation.name,
        });
        setShowErrors(false);
        setOpen(false);
    };

    const submit = (e) => {
        e.preventDefault();

        patch(route('workstations.update', workstation), {
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
                    <Button size={'icon'} aria-label={t('Edit the workstation')}>
                        <Svg type={'edit'} />
                    </Button>
                </DialogTrigger>
                <DialogContent size={'2xl'}>
                    <DialogHeader>
                        <DialogTitle>{t('Edit Workstation')}</DialogTitle>
                        <DialogDescription>
                            {t(
                                "Ready to update the workstation? Fill out the form below with the required details and click the 'Save' button to apply the changes.",
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
                                aria-label={t('Edit the workstation')}
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
