//TODO: Refactor
import { Link } from '@inertiajs/react';
import { Svg } from '@/Components/ui/svg/Svg';
import { useTranslation } from 'react-i18next';
import useLocalStorage from '@/Hooks/useLocalStorage';
import Header from '@/Components/layouts/Auth/Header';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import Sidebar from '@/Components/layouts/Auth/Customer/CustomerSidebar';
import SideBarLink from '@/Components/layouts/Auth/Customer/CustomerSidebarLink';

export default function CustomerLayout({ auth, children, localization }) {
    const { t } = useTranslation();

    const [sideBarOpen, setSideBarOpen] = useLocalStorage('sideBarOpen', false);

    const RespNavLink = (
        <>
            <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                {t('Dashboard')}
            </ResponsiveNavLink>
            <ResponsiveNavLink
                href={route('profile.edit')}
                active={route().current('profile.edit')}
            >
                {t('Profile')}
            </ResponsiveNavLink>
            <ResponsiveNavLink
                href={route('applications.index')}
                active={route().current('applications.index')}
            >
                {t('Applications')}
            </ResponsiveNavLink>
            <ResponsiveNavLink method='post' href={route('logout')} as='button'>
                {t('Logout')}
            </ResponsiveNavLink>
        </>
    );

    const dropdownLinks = [
        <Link className='block w-full' href={route('profile.edit')}>
            {t('Profile')}
        </Link>,
        <Link className='block w-full' href={route('logout')} method='post' as='button'>
            {t('Logout')}
        </Link>,
    ];

    return (
        <div className='bg-gray-100 transition duration-300 ease-linear dark:bg-gray-900'>
            <div className='flex h-screen overflow-hidden'>
                <Sidebar sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen}>
                    <SideBarLink
                        href={route('dashboard')}
                        active={route().current('dashboard')}
                        svg={<Svg type={'dashboard'} variant={'sideBar'} />}
                    >
                        {t('Dashboard')}
                    </SideBarLink>

                    <SideBarLink
                        href={route('profile.edit')}
                        active={route().current('profile.edit')}
                        svg={<Svg type={'profile'} variant={'sideBar'} />}
                    >
                        {t('Profile')}
                    </SideBarLink>

                    <SideBarLink
                        href={route('applications.index')}
                        active={
                            route().current('applications.index') ||
                            route().current('applications.create')
                        }
                        svg={<Svg type={'applications'} variant={'sideBar'} />}
                    >
                        {t('Applications')}
                    </SideBarLink>
                </Sidebar>

                <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
                    <Header
                        user={auth.customer}
                        avatarPath={auth.avatarPath}
                        RespNavLink={RespNavLink}
                        dropdownLinks={dropdownLinks}
                        sideBarOpen={sideBarOpen}
                        setSideBarOpen={setSideBarOpen}
                        localization={localization}
                    />
                    <main>
                        <div className='mx-auto max-w-7xl py-12'>{children}</div>
                    </main>
                </div>
            </div>
        </div>
    );
}
