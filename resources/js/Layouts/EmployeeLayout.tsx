import { Link } from '@inertiajs/react';
import Header from '@/Components/Header';
import { useTranslation } from 'react-i18next';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';

export default function EmployeeLayout({ auth, children, localization }) {
    const { t } = useTranslation();

    const RespNavLink = (
        <>
            <ResponsiveNavLink
                href={route('cashregister.index')}
                active={route().current('cashregister.index')}
            >
                {t('Cash Register')}
            </ResponsiveNavLink>
            <ResponsiveNavLink
                href={route('employee-profil.index')}
                active={route().current('employee-profil.index')}
            >
                {t('Profile')}
            </ResponsiveNavLink>
            <ResponsiveNavLink method='post' href={route('logout')} as='button'>
                {t('Logout')}
            </ResponsiveNavLink>
        </>
    );

    const dropdownLinks = [
        <Link className='block w-full' href={route('cashregister.index')}>
            {t('Cash Register')}
        </Link>,
        <Link className='block w-full' href={route('employee-profil.index')}>
            {t('Profile')}
        </Link>,
        <Link className='block w-full' href={route('logout')} method='post' as='button'>
            {t('Logout')}
        </Link>,
    ];

    return (
        <div className='bg-gray-100 transition duration-300 ease-linear dark:bg-gray-900'>
            <div className='flex h-screen overflow-hidden'>
                <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
                    <Header
                        user={auth.employee}
                        title={t(auth.employee.cr_workstations.name)}
                        avatarPath={auth.avatarPath}
                        RespNavLink={RespNavLink}
                        dropdownLinks={dropdownLinks}
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
