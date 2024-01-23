'use client';

import { type FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Form } from '@/Components/ui/form/form';
import { type Auth } from '@/Shared/Types/AuthTypes';
import { Button } from '@/Components/ui/button/button';
import { useForm as useFormInertia } from '@inertiajs/react';
import { DialogClose, DialogFooter } from '@/Components/ui/dialog/dialog';
import { GenericFormField } from '@/Components/ui/form/templates/GenericFormField';
import { defaultValues, formDatas } from '@/Shared/Datas/Forms/Auth/ConfirmDeleteFormDatas';

interface Datas {
    buttonTitle: string;
    buttonAriaLabel: string;
}

export function ConfirmDeleteForm({
    route,
    closeDialog,
    datas,
}: {
    route: string;
    closeDialog: () => void;
    datas: Datas;
}): JSX.Element {
    const { t } = useTranslation();

    const { buttonTitle, buttonAriaLabel } = datas;

    const {
        data,
        setData,
        delete: destroy,
        processing,
        errors,
        reset,
    } = useFormInertia(defaultValues);

    const form = useForm<Auth>({
        defaultValues: data,
    });

    function onSubmit(e: FormEvent): void {
        e.preventDefault();

        destroy(route, {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                form.reset();
                closeDialog();
            },
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={onSubmit}>
                <GenericFormField
                    form={form}
                    setData={setData}
                    errors={errors}
                    formData={formDatas}
                />

                <DialogFooter className='mt-6 flex justify-end'>
                    <DialogClose asChild>
                        <Button variant={'secondary'} onClick={closeDialog}>
                            {t('Cancel')}
                        </Button>
                    </DialogClose>

                    <Button
                        className='ml-3'
                        variant={'destructive'}
                        disabled={processing}
                        aria-label={t(buttonAriaLabel)}
                    >
                        {t(buttonTitle)}
                    </Button>
                </DialogFooter>
            </form>
        </Form>
    );
}
