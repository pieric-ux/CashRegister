import { type ReactNode } from 'react';
import Header from '@/Components/layouts/Header';
import SideBar from '@/Components/layouts/SideBar';
import SideBarLinks from '@/Components/layouts/SideBarLinks';
import { SideBarNavCustomerLayoutDatas } from '@/Shared/Datas/Navigation/SideBarNavDatas';
import { usePage } from '@inertiajs/react';
import { DropDownNavCustomerLayoutDatas } from '@/Shared/Datas/Navigation/DropdownNavDatas';
import { DrawerNavCustomerLayoutDatas } from '@/Shared/Datas/Navigation/DrawerNavDatas';

interface CustomerLayoutProps {
    children: ReactNode;
}

export default function CustomerLayout({ children }: CustomerLayoutProps): JSX.Element {
    const { customerAuth } = usePage().props;
    const { customer, avatarPath } = customerAuth;

    return (
        <div className='bg-background transition duration-300 ease-linear'>
            <div className='h-screen flex-col'>
                <Header
                    user={customer}
                    avatarPath={avatarPath}
                    dropdownMenuDatas={DropDownNavCustomerLayoutDatas}
                    drawerMenuDatas={DrawerNavCustomerLayoutDatas}
                />
                <SideBar>
                    <SideBarLinks datas={SideBarNavCustomerLayoutDatas} />
                </SideBar>
                <main className='container max-w-5xl space-y-6 py-8'>{children}</main>
            </div>
        </div>
    );
}
