import { type ReactNode } from 'react';
import { usePage } from '@inertiajs/react';
import Header from '@/Components/layouts/Header';
import { type Dish } from '@/Shared/Types/DishTypes';
import { type Product } from '@/Shared/Types/ProductTypes';
import { type Employee } from '@/Shared/Types/EmployeeTypes';
import { type Workstation } from '@/Shared/Types/WorkstationTypes';
import { type CashRegister } from '@/Shared/Types/CashRegisterTypes';
import { type PaymentMethod } from '@/Shared/Types/PaymentMethodsTypes';
import { type CategoryProducts } from '@/Shared/Types/CategoryProductsTypes';
import { DrawerNavEmployeeLayoutDatas } from '@/Shared/Datas/Navigation/DrawerNavDatas';
import { DropDownNavEmployeeLayoutDatas } from '@/Shared/Datas/Navigation/DropdownNavDatas';

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

interface EmployeeLayoutProps {
    children: ReactNode;
}

export default function EmployeeLayout({ children }: EmployeeLayoutProps): JSX.Element {
    const { employee } = usePage<PageProps>().props;

    const avatarPath = employee.media.find(
        /* eslint-disable @typescript-eslint/naming-convention */
        ({ collection_name }) => collection_name === 'avatars-employees',
    )?.original_url;

    return (
        <div className='bg-background transition duration-300 ease-linear'>
            <div className='min-h-screen flex-col'>
                <Header
                    user={employee}
                    avatarPath={avatarPath}
                    title={employee?.cr_workstations?.name}
                    dropdownMenuDatas={DropDownNavEmployeeLayoutDatas}
                    drawerMenuDatas={DrawerNavEmployeeLayoutDatas}
                />
                <main className='container h-[calc(100vh-5rem)] space-y-6 py-4 md:py-6 lg:py-8'>
                    {children}
                </main>
            </div>
        </div>
    );
}
