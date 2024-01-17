'use client';

import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Input } from '@/Components/ui/input/input';
import { Button } from '@/Components/ui/button/button';
import { useForm as useFormInertia } from '@inertiajs/react';
import { DialogClose, DialogFooter } from '@/Components/ui/dialog/dialog';
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
import { ProductsTableContext } from '@/Context/ProductsTableContext';

interface FormInput {
    name: string;
    unit: string;
    client_price: string;
    cost_price: string;
    category: string;
    dish: string;
}

export function ProductInfosForm({
    application,
    product,
    closeDialog,
    isUpdate = false,
}: {
    application?: any;
    product?: any; // FIXME: type application & product
    closeDialog: () => void;
    isUpdate?: boolean;
}): JSX.Element {
    const { t } = useTranslation();

    const { categories, dishes } = useContext(ProductsTableContext);

    const defaultValues: FormInput = {
        name: isUpdate ? product.name : '',
        unit: isUpdate ? product.unit : '',
        client_price: isUpdate ? product.client_price : '',
        cost_price: isUpdate ? product.cost_price : '',
        category: isUpdate ? product.fk_categories_products_id : '',
        dish: isUpdate ? product.fk_dishes_id : '',
    };

    const { data, setData, post, patch, processing, errors } = useFormInertia(defaultValues);

    const form = useForm<FormInput>({
        defaultValues: data,
    });

    useEffect(() => {
        // FIXME: don't use useEffect to changing data with setData
        setData(form.getValues());
    }, [form.getValues(), setData]);

    function onSubmit(values: FormInput): void {
        setData(values);
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
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('Name')}</FormLabel>
                            <FormControl>
                                <Input isFocused={true} {...field} />
                            </FormControl>
                            <FormMessage>{errors.name}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='unit'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('Unit')}</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage>{errors.unit}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='client_price'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('Client Price')}</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage>{errors.client_price}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='cost_price'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('Cost Price')}</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage>{errors.cost_price}</FormMessage>
                        </FormItem>
                    )}
                />
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
                                        onValueChange={field.onChange}
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
                                                        ? t('No Category')
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
                                        onValueChange={field.onChange}
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
