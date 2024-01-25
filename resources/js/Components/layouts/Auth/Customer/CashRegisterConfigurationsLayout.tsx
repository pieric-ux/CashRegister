//TODO: Refactor
import { type ReactNode } from 'react';
import { Link } from '@inertiajs/react';
import { Svg } from '@/Components/ui/svg/Svg';
import { useTranslation } from 'react-i18next';
import useLocalStorage from '@/Hooks/useLocalStorage';
import Header from '@/Components/layouts/Auth/Header';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { type CashRegister } from '@/Shared/Types/CashRegisterTypes';
import Sidebar from '@/Components/layouts/Auth/Customer/CustomerSidebar';
import SideBarLink from '@/Components/layouts/Auth/Customer/CustomerSidebarLink';
import { CashRegisterConfigurationsContext } from '@/Context/CashRegisterModulesContext';

export default function CashRegisterConfigurationsLayout({
    cashRegisterModule,
    children,
}: {
    cashRegisterModule: CashRegister;
    children: ReactNode;
}): JSX.Element {
    const { t } = useTranslation();

    const [sideBarOpen, setSideBarOpen] = useLocalStorage('sideBarOpen', false);
    // TODO: Flavien: peut être fait dans un autre composant ou en dehors de ce composant pour éviter de le refaire à chaque rendu
    const RespNavLink = (
        <>
            <ResponsiveNavLink href={route('dashboard')}>{t('Home')}</ResponsiveNavLink>
            <ResponsiveNavLink
                href={route('cashregisters.show', cashRegisterModule.slug)}
                active={route().current('cashregisters.show', cashRegisterModule.slug)}
            >
                {t('App Dashboard')}
            </ResponsiveNavLink>
            <ResponsiveNavLink
                href={route('employees.index', cashRegisterModule.slug)}
                active={route().current('employees.index', cashRegisterModule.slug)}
            >
                {t('Employees')}
            </ResponsiveNavLink>
            <ResponsiveNavLink
                href={route('workstations.index', cashRegisterModule.slug)}
                active={route().current('workstations.index', cashRegisterModule.slug)}
            >
                {t('Workstations')}
            </ResponsiveNavLink>
            <ResponsiveNavLink
                href={route('categories.index', cashRegisterModule.slug)}
                active={route().current('categories.index', cashRegisterModule.slug)}
            >
                {t('Categories')}
            </ResponsiveNavLink>
            <ResponsiveNavLink
                href={route('dishes.index', cashRegisterModule.slug)}
                active={route().current('dishes.index', cashRegisterModule.slug)}
            >
                {t('Dishes')}
            </ResponsiveNavLink>
            <ResponsiveNavLink
                href={route('products.index', cashRegisterModule.slug)}
                active={route().current('products.index', cashRegisterModule.slug)}
            >
                {t('Products')}
            </ResponsiveNavLink>
            <ResponsiveNavLink
                href={route('transactions.index', cashRegisterModule.slug)}
                active={route().current('transactions.index', cashRegisterModule.slug)}
            >
                {t('Transactions')}
            </ResponsiveNavLink>
            <ResponsiveNavLink method='post' href={route('logout')} as='button'>
                {t('Logout')}
            </ResponsiveNavLink>
        </>
    );

    const dropdownLinks = [
        <Link className='block w-full' href={route('dashboard')}>
            {t('Home')}
        </Link>,
        <Link className='block w-full' href={route('profile.edit')}>
            {t('Profile')}
        </Link>,
        <Link className='block w-full' href={route('logout')} method='post' as='button'>
            {t('Logout')}
        </Link>,
    ];

    return (
        <CashRegisterConfigurationsContext.Provider value={{ cashRegisterModule }}>
            <div className='bg-gray-100 transition duration-300 ease-linear dark:bg-gray-900'>
                <div className='flex h-screen overflow-hidden'>
                    <Sidebar sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen}>
                        <SideBarLink
                            href={route('cashregisters.show', cashRegisterModule.slug)}
                            active={route().current('cashregisters.show', cashRegisterModule.slug)}
                            svg={<Svg type={'dashboard'} variant={'sideBar'} />}
                        >
                            {t('App Dashboard')}
                        </SideBarLink>

                        <SideBarLink
                            href={route('employees.index', cashRegisterModule.slug)}
                            active={route().current('employees.index', cashRegisterModule.slug)}
                            svg={<Svg type={'employees'} variant={'sideBar'} />}
                        >
                            {t('Employees')}
                        </SideBarLink>

                        <SideBarLink
                            href={route('workstations.index', cashRegisterModule.slug)}
                            active={route().current('workstations.index', cashRegisterModule.slug)}
                            svg={<Svg type={'workstations'} variant={'sideBar'} />}
                        >
                            {t('Workstations')}
                        </SideBarLink>

                        <SideBarLink
                            href={route('categories.index', cashRegisterModule.slug)}
                            active={route().current('categories.index', cashRegisterModule.slug)}
                            svg={<Svg type={'categories'} variant={'sideBar'} />}
                        >
                            {t('Categories')}
                        </SideBarLink>

                        <SideBarLink
                            href={route('dishes.index', cashRegisterModule.slug)}
                            active={route().current('dishes.index', cashRegisterModule.slug)}
                            svg={<Svg type={'dishes'} variant={'sideBar'} />}
                        >
                            {t('Dishes')}
                        </SideBarLink>

                        <SideBarLink
                            href={route('products.index', cashRegisterModule.slug)}
                            active={route().current('products.index', cashRegisterModule.slug)}
                            svg={<Svg type={'products'} variant={'sideBar'} />}
                        >
                            {t('Products')}
                        </SideBarLink>

                        <SideBarLink
                            href={route('transactions.index', cashRegisterModule.slug)}
                            active={route().current('transactions.index', cashRegisterModule.slug)}
                            svg={<Svg type={'transactions'} variant={'sideBar'} />}
                        >
                            {t('Transactions')}
                        </SideBarLink>
                    </Sidebar>

                    <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
                        <Header
                            title={cashRegisterModule.name}
                            RespNavLink={RespNavLink}
                            dropdownLinks={dropdownLinks}
                            sideBarOpen={sideBarOpen}
                            setSideBarOpen={setSideBarOpen}
                        />

                        <main>
                            <div className='mx-auto max-w-7xl py-12'>
                                <div className='mx-auto max-w-7xl space-y-6 px-2 sm:px-6 lg:px-8'>
                                    {children}
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </CashRegisterConfigurationsContext.Provider>
    );
}
