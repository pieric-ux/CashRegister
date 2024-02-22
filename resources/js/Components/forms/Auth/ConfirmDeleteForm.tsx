'use client';

import { type FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { useWindowSize } from 'usehooks-ts';
import { useTranslation } from 'react-i18next';
import { Form } from '@/Components/ui/form/form';
import { type Auth } from '@/Shared/Types/AuthTypes';
import { Button } from '@/Components/ui/button/button';
import { useForm as useFormInertia } from '@inertiajs/react';
import { DrawerFooter } from '@/Components/ui/drawer/drawerFooter';
import { DialogClose, DialogFooter } from '@/Components/ui/dialog/dialog';
import { GenericFormField } from '@/Components/ui/form/templates/GenericFormField';
import { defaultValues, formDatas } from '@/Shared/Datas/Forms/Auth/ConfirmDeleteFormDatas';

interface Datas {
    buttonTitle: string;
    buttonAriaLabel: string;
}

interface ConfirmDeleteFormProps<T> {
    route: string;
    closeDialog: () => void;
    datas: Datas;
    multipleDeleteDatas?: T[];
}

export default function ConfirmDeleteForm<T>({
    route,
    closeDialog,
    multipleDeleteDatas,
    datas,
}: ConfirmDeleteFormProps<T>): JSX.Element {
    const { t } = useTranslation();
    const { width } = useWindowSize();
    const isMobile = width < 640;

    const { buttonTitle, buttonAriaLabel } = datas;

    const {
        data,
        setData,
        delete: destroy,
        processing,
        errors,
        reset,
        transform,
    } = useFormInertia(defaultValues);

    const form = useForm<Auth>({
        defaultValues: data,
    });

    transform((data) => ({ ...data, multipleDeleteDatas }));

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
                <input type='email' className='hidden' autoComplete='username' />
                <GenericFormField
                    form={form}
                    setData={setData}
                    errors={errors}
                    formData={formDatas}
                />
                {isMobile ? (
                    <DrawerFooter>
                        <DialogClose asChild>
                            <Button variant={'secondary'} onClick={closeDialog}>
                                {t('Cancel')}
                            </Button>
                        </DialogClose>

                        <Button
                            variant={'destructive'}
                            disabled={processing}
                            aria-label={t(buttonAriaLabel)}
                        >
                            {t(buttonTitle)}
                        </Button>
                    </DrawerFooter>
                ) : (
                    <DialogFooter className='mt-6 flex justify-end'>
                        <DialogClose asChild>
                            <Button variant={'secondary'} onClick={closeDialog}>
                                {t('Cancel')}
                            </Button>
                        </DialogClose>

                        <Button
                            variant={'destructive'}
                            disabled={processing}
                            aria-label={t(buttonAriaLabel)}
                        >
                            {t(buttonTitle)}
                        </Button>
                    </DialogFooter>
                )}
            </form>
        </Form>
    );
}
