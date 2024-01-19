'use client';

import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useContext, type FormEvent } from 'react';
import { Button } from '@/Components/ui/button/button';
import { type Product } from '@/Shared/Types/ProductTypes';
import { useForm as useFormInertia } from '@inertiajs/react';
import { ProductsTableContext } from '@/Context/ProductsTableContext';
import { DialogClose, DialogFooter } from '@/Components/ui/dialog/dialog';
import { GenericFormField } from '@/Components/ui/form/templates/GenericFormField';
import { formDatas, getDefaultValues } from '@/Shared/Datas/Forms/ProductInfoFormDatas';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/Components/ui/form/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select/select';

export function ProductInfosForm({
    application,
    product,
    closeDialog,
    isUpdate = false,
}: {
    application?: any; // TODO: type application
    product?: any; // TODO: type product
    closeDialog: () => void;
    isUpdate?: boolean;
}): JSX.Element {
    const { t } = useTranslation();

    const { categories, dishes } = useContext(ProductsTableContext);

    const defaultValues = getDefaultValues(product, isUpdate);

    const { data, setData, post, patch, processing, errors } = useFormInertia(defaultValues);

    const form = useForm<Product>({
        defaultValues: data,
    });

    function onSubmit(e: FormEvent): void {
        e.preventDefault();

        isUpdate
            ? patch(route('products.update', product), {
                  preserveScroll: true,
                  onSuccess: () => closeDialog(),
              })
            : post(route('products.store', application.slug), {
                  preserveScroll: true,
                  onSuccess: () => closeDialog(),
              });
    }

    return (
        <Form {...form}>
            <form onSubmit={onSubmit}>
                {formDatas.map((formData) => (
                    <GenericFormField
                        key={formData.name}
                        form={form}
                        setData={setData}
                        errors={errors}
                        formData={formData}
                    />
                ))}
                {isUpdate && (
                    <>
                        <FormField
                            control={form.control}
                            name='category'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('Category')}</FormLabel>
                                    <Select
                                        defaultValue={field.value}
                                        onValueChange={(value) => {
                                            field.onChange(value);
                                            setData('category', value);
                                        }}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                {/* FIXME: don't display the textContext */}
                                                <SelectValue />{' '}
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent position='popper'>
                                            {categories.map((category) => (
                                                <SelectItem key={category.id} value={category.id}>
                                                    {category.name === 'No category'
                                                        ? t('No category')
                                                        : category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage>{errors.category}</FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='dish'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('Dish')}</FormLabel>
                                    <Select
                                        defaultValue={field.value}
                                        onValueChange={(value) => {
                                            field.onChange(value);
                                            setData('dish', value);
                                        }}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {/* FIXME: don't display the textContext */}
                                            {dishes.map((dish) => (
                                                <SelectItem key={dish.id} value={dish.id}>
                                                    {dish.name === 'No dish'
                                                        ? t('No dish')
                                                        : `${dish.name} ${dish.unit}`}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage>{errors.dish}</FormMessage>
                                </FormItem>
                            )}
                        />
                    </>
                )}

                <DialogFooter className='mt-6 flex justify-end'>
                    <DialogClose asChild>
                        <Button variant={'secondary'} onClick={closeDialog}>
                            {t('Cancel')}
                        </Button>
                    </DialogClose>

                    <Button
                        className='ml-3'
                        disabled={processing}
                        aria-label={isUpdate ? t('Edit the product') : t('Create your product')}
                    >
                        {isUpdate ? t('Save') : t('Create')}
                    </Button>
                </DialogFooter>
            </form>
        </Form>
    );
}
