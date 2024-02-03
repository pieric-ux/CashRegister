import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { type Dish } from '@/Shared/Types/DishTypes';
import { type Product } from '@/Shared/Types/ProductTypes';
import { type Employee } from '@/Shared/Types/EmployeeTypes';
import { Card, CardHeader } from '@/Components/ui/card/card';
import Cart from '@/Pages/Employees/CashRegister/Components/Cart';
import Total from '@/Pages/Employees/CashRegister/Components/Total';
import Items from '@/Pages/Employees/CashRegister/Components/Items';
import { CashRegisterContext } from '@/Context/CashRegisterContext';
import Payment from '@/Pages/Employees/CashRegister/Components/Payment';
import { type PaymentMethod } from '@/Shared/Types/PaymentMethodsTypes';
import { type CategoryProducts } from '@/Shared/Types/CategoryProductsTypes';
import EmployeeLayout from '@/Components/layouts/Auth/Employee/EmployeeLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs/tabs';

export const emptyCartItem = { id: null, name: '', quantity: 0, client_price: 0 };
export const emptyCart = { items: Array(5).fill(emptyCartItem), total: 0 };

interface EmployeeAuth {
    employee: Employee;
    avatarPath: string;
}

interface CashRegisterProps {
    employeeAuth: EmployeeAuth;
    categories: CategoryProducts[];
    dishes: Dish[];
    products: Product[];
    paymentMethods: PaymentMethod[];
}

export default function CashRegister({
    employeeAuth,
    categories,
    dishes,
    products,
    paymentMethods,
}: CashRegisterProps): JSX.Element {
    const { t } = useTranslation();

    const [cart, setCart] = useState(emptyCart);
    const isCartEmpty = cart.items.every((item) => item.id === null || item.quantity === 0);

    return (
        <EmployeeLayout>
            <Head title={t(`${employeeAuth?.employee?.cr_workstations?.name}`)} />

            <Card className='h-full'>
                <CardHeader className='h-full'>
                    <CashRegisterContext.Provider
                        value={{ categories, dishes, products, cart, setCart }}
                    >
                        <Tabs defaultValue='Cart' className='relative h-full space-y-6'>
                            <TabsContent value='Cart' className='h-full space-y-6'>
                                <Cart />
                                <div className='flex items-center justify-end'>
                                    <Total />
                                </div>
                                <Payment
                                    paymentMethods={paymentMethods}
                                    isCartEmpty={isCartEmpty}
                                />
                            </TabsContent>
                            <TabsContent value='Products' className='space-y-6'>
                                <Items />
                            </TabsContent>
                            <TabsList className='absolute bottom-0 grid w-full grid-cols-2'>
                                <TabsTrigger value='Cart'>{t('Cart')}</TabsTrigger>
                                <TabsTrigger value='Products'>{t('Products')}</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </CashRegisterContext.Provider>
                </CardHeader>
            </Card>
        </EmployeeLayout>
    );
}
