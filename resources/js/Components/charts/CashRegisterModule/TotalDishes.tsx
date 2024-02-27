import { usePage } from '@inertiajs/react';
import { Svg } from '@/Components/ui/svg/Svg';
import { useTranslation } from 'react-i18next';
import { type Dish } from '@/Shared/Types/DishTypes';
import { type Product } from '@/Shared/Types/ProductTypes';
import { type CashRegister } from '@/Shared/Types/CashRegisterTypes';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card/card';

interface PageProps extends InertiaPageProps {
    cashRegisterModule: CashRegister & {
        cr_dishes: (Dish & { cr_products: Product[] })[];
    };
}

export default function TotalDishes() {
    const { t } = useTranslation();
    const { cashRegisterModule } = usePage<PageProps>().props;

    const getCountDish = cashRegisterModule.cr_dishes.length - 1;

    return (
        <Card>
            <CardHeader>
                <div className='flex items-center justify-between'>
                    <CardTitle>{t('Dishes')}</CardTitle>
                    <Svg type='dishes' variant='sideBar' />
                </div>
            </CardHeader>
            <CardContent>
                <div className='text-2xl font-bold'>{getCountDish}</div>
            </CardContent>
        </Card>
    );
}
