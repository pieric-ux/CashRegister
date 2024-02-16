import { type ReactNode } from 'react';
import { usePage } from '@inertiajs/react';
import Header from '@/Components/layouts/Header';
import SideBar from '@/Components/layouts/SideBar';
import SideBarLinks from '@/Components/layouts/SideBarLinks';
import { NavigationDatas } from '@/Shared/Types/NavigationTypes';
import { DrawerNavCustomerLayoutDatas } from '@/Shared/Datas/Navigation/DrawerNavDatas';
import { SideBarNavCustomerLayoutDatas } from '@/Shared/Datas/Navigation/SideBarNavDatas';
import { DropDownNavCustomerLayoutDatas } from '@/Shared/Datas/Navigation/DropdownNavDatas';

interface CustomerLayoutProps {
    children: ReactNode;
}

export default function CustomerLayout({ children }: CustomerLayoutProps): JSX.Element {
    const { customer } = usePage<InertiaPageProps>().props;
    const avatarPath = customer.media.find(
        ({ collection_name }) => collection_name === 'avatars',
    )?.original_url;

    return (
        <div className='bg-background transition duration-300 ease-linear'>
            <div className='min-h-screen flex-col'>
                <Header
                    user={customer}
                    avatarPath={avatarPath}
                    dropdownMenuDatas={DropDownNavCustomerLayoutDatas}
                    drawerMenuDatas={DrawerNavCustomerLayoutDatas}
                />
                <SideBar>
                    <SideBarLinks datas={SideBarNavCustomerLayoutDatas as NavigationDatas[]} />
                </SideBar>
                <main className='container max-w-5xl space-y-6 py-8'>{children}</main>
            </div>
        </div>
    );
}
