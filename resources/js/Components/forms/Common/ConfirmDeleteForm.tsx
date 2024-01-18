'use client';

import { type FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Form } from '@/Components/ui/form/form';
import { type Auth } from '@/Shared/Types/AuthTypes';
import { GenericFormField } from './GenericFormField';
import { Button } from '@/Components/ui/button/button';
import { useForm as useFormInertia } from '@inertiajs/react';
import { DialogClose, DialogFooter } from '@/Components/ui/dialog/dialog';
import { defaultValues, formDatas } from '@/Shared/Datas/ConfirmDeleteFormDatas';

export function ConfirmDeleteForm({ route, closeDialog, ariaLabel, buttonTiltle }): JSX.Element {
    const { t } = useTranslation();

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
                        aria-label={ariaLabel}
                    >
                        {buttonTiltle}
                    </Button>
                </DialogFooter>
            </form>
        </Form>
    );
}
