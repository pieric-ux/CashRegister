import { usePage } from '@inertiajs/react';
import { Svg } from '@/Components/ui/svg/Svg';
import { useTranslation } from 'react-i18next';
import { type Product } from '@/Shared/Types/ProductTypes';
import { type CashRegister } from '@/Shared/Types/CashRegisterTypes';
import { type CategoryProducts } from '@/Shared/Types/CategoryProductsTypes';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card/card';

interface PageProps extends InertiaPageProps {
    cashRegisterModule: CashRegister & {
        cr_categories_products: (CategoryProducts & { cr_products: Product[] })[];
    };
}

export default function TotalProducts() {
    const { t } = useTranslation();
    const { cashRegisterModule } = usePage<PageProps>().props;

    const getCountProducts = cashRegisterModule.cr_categories_products.reduce(
        (count, category) => count + category.cr_products.length,
        0,
    );

    return (
        <Card>
            <CardHeader>
                <div className='flex items-center justify-between'>
                    <CardTitle>{t('Products')}</CardTitle>
                    <Svg type='products' variant='sideBar' />
                </div>
            </CardHeader>
            <CardContent>
                <div className='text-2xl font-bold'>{getCountProducts}</div>
            </CardContent>
        </Card>
    );
}
