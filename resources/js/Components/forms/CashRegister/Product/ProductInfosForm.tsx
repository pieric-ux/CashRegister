'use client';

import { type FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { type Dish } from '@/Shared/Types/DishTypes';
import { type Product } from '@/Shared/Types/ProductTypes';
import { type CashRegister } from '@/Shared/Types/CashRegisterTypes';
import { useForm as useFormInertia, usePage } from '@inertiajs/react';
import DialogFormFooter from '@/Components/forms/Common/DialogFormFooter';
import { type CategoryProducts } from '@/Shared/Types/CategoryProductsTypes';
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

interface PageProps extends InertiaPageProps {
    cashRegisterModule: CashRegister & {
        cr_categories_products: CategoryProducts[];
        cr_dishes: Dish[];
        cr_products: Product[];
    };
}

interface ProductInfoFormProps {
    product?: Product;
    closeDialog: () => void;
    isUpdate?: boolean;
}

export default function ProductInfosForm({
    product,
    closeDialog,
    isUpdate = false,
}: ProductInfoFormProps): JSX.Element {
    const { t } = useTranslation();

    const { cashRegisterModule } = usePage<PageProps>().props;

    const categories = cashRegisterModule.cr_categories_products;
    const dishes = cashRegisterModule.cr_dishes;

    const defaultValues = getDefaultValues(product, isUpdate); // FIXME: check type with Flavien

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
            : post(route('products.store', cashRegisterModule.slug), {
                  preserveScroll: true,
                  onSuccess: () => closeDialog(),
              });
    }

    return (
        <Form {...form}>
            <form onSubmit={onSubmit} className='space-y-4'>
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
                                                <SelectValue />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent position='popper'>
                                            {categories?.map((category) => (
                                                <SelectItem key={category.id} value={category.name}>
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
                                        <SelectContent position='popper'>
                                            {dishes?.map((dish) => (
                                                <SelectItem key={dish.id} value={dish.name}>
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

                <DialogFormFooter
                    closeDialog={closeDialog}
                    processing={processing}
                    buttonAriaLabel={isUpdate ? t('Edit the product') : t('Create your product')}
                    isUpdate={isUpdate}
                />
            </form>
        </Form>
    );
}
