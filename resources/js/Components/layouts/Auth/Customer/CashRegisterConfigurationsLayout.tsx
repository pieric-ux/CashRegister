import { type ReactNode } from 'react';
import { usePage } from '@inertiajs/react';
import Header from '@/Components/layouts/Header';
import SideBar from '@/Components/layouts/SideBar';
import SideBarLinks from '@/Components/layouts/SideBarLinks';
import { type CashRegister } from '@/Shared/Types/CashRegisterTypes';
import { CashRegisterConfigurationsContext } from '@/Context/CashRegisterModulesContext';
import { SideBarNavConfigurationsLayoutDatas } from '@/Shared/Datas/Navigation/SideBarNavDatas';
import { DropDownNavConfigurationsLayoutDatas } from '@/Shared/Datas/Navigation/DropdownNavDatas';
import { DrawerNavConfigurationsLayoutDatas } from '@/Shared/Datas/Navigation/DrawerNavDatas';

interface CashRegisterConfigurationsProps {
    cashRegisterModule: CashRegister;
    children: ReactNode;
}

export default function CashRegisterConfigurationsLayout({
    cashRegisterModule,
    children,
}: CashRegisterConfigurationsProps): JSX.Element {
    const { customerAuth } = usePage().props;
    const { customer, avatarPath } = customerAuth;

    return (
        <CashRegisterConfigurationsContext.Provider value={{ cashRegisterModule }}>
            <div className='bg-background transition duration-300 ease-linear'>
                <div className='h-screen flex-col'>
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
                            datas={SideBarNavConfigurationsLayoutDatas}
                            slug={cashRegisterModule.slug}
                        />
                    </SideBar>
                    <main className='container max-w-5xl space-y-6 py-8'>{children}</main>
                </div>
            </div>
        </CashRegisterConfigurationsContext.Provider>
    );
}
