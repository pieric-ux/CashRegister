import 'swiper/css/bundle';
import { usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { type Dish } from '@/Shared/Types/DishTypes';
import { type Product } from '@/Shared/Types/ProductTypes';
import { type Employee } from '@/Shared/Types/EmployeeTypes';
import { type Workstation } from '@/Shared/Types/WorkstationTypes';
import { type CashRegister } from '@/Shared/Types/CashRegisterTypes';
import { type PaymentMethod } from '@/Shared/Types/PaymentMethodsTypes';
import { type CategoryProducts } from '@/Shared/Types/CategoryProductsTypes';
import SwiperItemGeneric from '@/Components/features/cashregister/SwiperItemGeneric';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/Components/ui/accordion/accordion';

interface PageProps extends InertiaPageProps {
    employee: Employee & {
        cr_workstations: Workstation & {
            cr_modules: CashRegister & {
                cr_dishes: Dish[];
                cr_payment_methods: PaymentMethod[];
            };
            cr_products: Product &
                {
                    cr_categories_products: CategoryProducts;
                    cr_dishes: Dish;
                }[];
        };
    };
}

export default function Items(): JSX.Element {
    const { t } = useTranslation();
    const { employee } = usePage<PageProps>().props;

    const products = employee.cr_workstations.cr_products;
    const categories = products
        .map((product) => product.cr_categories_products)
        .filter((category) => category !== null)
        .filter((category, index, self) => self.findIndex((c) => c.id === category.id) === index)
        .sort((a, b) => (a.order || 0) - (b.order || 0));

    const dishes = employee.cr_workstations.cr_modules.cr_dishes;
    const productsDishes = products
        .map((product) => product.cr_dishes)
        .filter((dish) => dish !== null && dish.name !== 'No dish')
        .filter((dish, index, self) => self.findIndex((d) => d.id === dish.id) === index);

    const soldSeparatelyDishes = dishes.filter((dish) => dish.is_soldSeparately);
    const returnDishes = [...soldSeparatelyDishes, ...productsDishes].filter(
        (dish, index, self) => self.findIndex((d) => d.id === dish.id) === index,
    );
    // FIXME: defaultValues
    return (
        <Accordion type='single' defaultValue='Return Dishes' collapsible>
            {returnDishes.length > 0 && (
                <AccordionItem value='Return Dishes'>
                    <AccordionTrigger>{t('Return Dishes')}</AccordionTrigger>
                    <AccordionContent>
                        <SwiperItemGeneric datas={returnDishes} itemType='return' />
                    </AccordionContent>
                </AccordionItem>
            )}

            {categories.map((category) => {
                const productsCategorized = products.filter(
                    (product) => product.cr_categories_products.id === category.id,
                ) as (Product & { cr_categories_products: CategoryProducts; cr_dishes: Dish })[];
                return (
                    <AccordionItem key={category.name} value={category.name}>
                        <AccordionTrigger>{t(category.name)}</AccordionTrigger>
                        <AccordionContent>
                            <SwiperItemGeneric datas={productsCategorized} itemType='product' />
                        </AccordionContent>
                    </AccordionItem>
                );
            })}

            {soldSeparatelyDishes.length > 0 && (
                <AccordionItem value='Dishes'>
                    <AccordionTrigger>{t('Dishes')}</AccordionTrigger>
                    <AccordionContent>
                        <SwiperItemGeneric datas={soldSeparatelyDishes} itemType='dishes' />
                    </AccordionContent>
                </AccordionItem>
            )}
        </Accordion>
    );
}
