import { type ReactNode } from 'react';
import { usePage } from '@inertiajs/react';
import Header from '@/Components/layouts/Header';
import SideBar from '@/Components/layouts/SideBar';
import SideBarLinks from '@/Components/layouts/SideBarLinks';
import { type CashRegister } from '@/Shared/Types/CashRegisterTypes';
import { DrawerNavConfigurationsLayoutDatas } from '@/Shared/Datas/Navigation/DrawerNavDatas';
import { SideBarNavConfigurationsLayoutDatas } from '@/Shared/Datas/Navigation/SideBarNavDatas';
import { DropDownNavConfigurationsLayoutDatas } from '@/Shared/Datas/Navigation/DropdownNavDatas';
import { NavigationDatas } from '@/Shared/Types/NavigationTypes';
import { Toaster } from '@/Components/ui/toast/toaster';

interface PageProps extends InertiaPageProps {
    cashRegisterModule: CashRegister;
}

interface CashRegisterConfigurationsProps {
    children: ReactNode;
}

export default function CashRegisterConfigurationsLayout({
    children,
}: CashRegisterConfigurationsProps): JSX.Element {
    const { customer, cashRegisterModule } = usePage<PageProps>().props;
    const avatarPath = customer.media.find(
        ({ collection_name }) => collection_name === 'avatars',
    )?.original_url;

    return (
        <div className='bg-background transition duration-300 ease-linear'>
            <div className='min-h-screen flex-col'>
                <Header
                    user={customer}
                    avatarPath={avatarPath}
                    title={cashRegisterModule.name}
                    dropdownMenuDatas={DropDownNavConfigurationsLayoutDatas}
                    drawerMenuDatas={DrawerNavConfigurationsLayoutDatas}
                    slug={cashRegisterModule.slug}
                />
                <SideBar>
                    <SideBarLinks
                        datas={SideBarNavConfigurationsLayoutDatas as NavigationDatas[]}
                        slug={cashRegisterModule.slug}
                    />
                </SideBar>
                <main className='container max-w-5xl space-y-6 py-8'>{children}</main>
                <Toaster />
            </div>
        </div>
    );
}
