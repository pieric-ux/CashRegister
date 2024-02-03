import 'swiper/css/bundle';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { type Dish } from '@/Shared/Types/DishTypes';
import { CashRegisterContext } from '@/Context/CashRegisterContext';
import SwiperItemGeneric from '@/Components/features/cashregister/SwiperItemGeneric';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/Components/ui/accordion/accordion';

export default function Items(): JSX.Element {
    const { t } = useTranslation();

    const { categories, dishes, products } = useContext(CashRegisterContext);

    const soldSeparatelydDishesMap = new Map(
        dishes.filter((dish: Dish) => dish.is_soldSeparately).map((dish: Dish) => [dish.id, dish]),
    );

    const productsDishesMap = products.reduce((dishes, product) => {
        if (product.cr_dishes !== undefined && product.cr_dishes.name !== 'No dish') {
            dishes.set(product.cr_dishes.id, product.cr_dishes);
        }
        return dishes;
    }, new Map());

    const returnDishesMap = new Map([...soldSeparatelydDishesMap, ...productsDishesMap]);

    return (
        <Accordion type='single' defaultValue='Return Dishes' collapsible>
            {returnDishesMap.size > 0 && (
                <AccordionItem value='Return Dishes'>
                    <AccordionTrigger>{t('Return Dishes')}</AccordionTrigger>
                    <AccordionContent>
                        <SwiperItemGeneric datas={returnDishesMap} itemType='return' />
                    </AccordionContent>
                </AccordionItem>
            )}
            {categories
                ?.filter((category) => {
                    const filteredProducts = products.filter(
                        (p) => p?.cr_categories_products?.id === category.id,
                    );
                    return filteredProducts.length > 0;
                })
                .map((category) => {
                    const filteredProducts = products.filter(
                        (p) => p?.cr_categories_products?.id === category.id,
                    );
                    return (
                        <AccordionItem key={category.name} value={category.name}>
                            <AccordionTrigger>{t(category.name)}</AccordionTrigger>
                            <AccordionContent>
                                <SwiperItemGeneric datas={filteredProducts} itemType='product' />
                            </AccordionContent>
                        </AccordionItem>
                    );
                })}
            {soldSeparatelydDishesMap.size > 0 && (
                <AccordionItem value='Dishes'>
                    <AccordionTrigger>{t('Dishes')}</AccordionTrigger>
                    <AccordionContent>
                        <SwiperItemGeneric datas={soldSeparatelydDishesMap} itemType='dishes' />
                    </AccordionContent>
                </AccordionItem>
            )}
        </Accordion>
    );
}
