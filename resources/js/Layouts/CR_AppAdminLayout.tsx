import Header from '@/Components/Header';
import Sidebar from '@/Components/SideBar';
import SideBarLink from '@/Components/SideBarLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import Dropdown from '@/Components/Dropdown';
import useLocalStorage from '@/Hooks/useLocalStorage';
import { useTranslation } from 'react-i18next';
import { Svg } from '@/Components/ui/svg/Svg';

export default function CR_AppAdminLayout({ auth, application, children, localization }) {
    const { t } = useTranslation();

    const [sideBarOpen, setSideBarOpen] = useLocalStorage('sideBarOpen', false);

    const RespNavLink = (
        <>
            <ResponsiveNavLink href={route('dashboard')}>{t('Home')}</ResponsiveNavLink>
            <ResponsiveNavLink
                href={route('applications.show', application.slug)}
                active={route().current('applications.show', application.slug)}
            >
                {t('App Dashboard')}
            </ResponsiveNavLink>
            <ResponsiveNavLink
                href={route('employees.index', application.slug)}
                active={route().current('employees.index', application.slug)}
            >
                {t('Employees')}
            </ResponsiveNavLink>
            <ResponsiveNavLink
                href={route('workstations.index', application.slug)}
                active={route().current('workstations.index', application.slug)}
            >
                {t('Workstations')}
            </ResponsiveNavLink>
            <ResponsiveNavLink
                href={route('categories.index', application.slug)}
                active={route().current('categories.index', application.slug)}
            >
                {t('Categories')}
            </ResponsiveNavLink>
            <ResponsiveNavLink
                href={route('dishes.index', application.slug)}
                active={route().current('dishes.index', application.slug)}
            >
                {t('Dishes')}
            </ResponsiveNavLink>
            <ResponsiveNavLink
                href={route('products.index', application.slug)}
                active={route().current('products.index', application.slug)}
            >
                {t('Products')}
            </ResponsiveNavLink>
            <ResponsiveNavLink
                href={route('transactions.index', application.slug)}
                active={route().current('transactions.index', application.slug)}
            >
                {t('Transactions')}
            </ResponsiveNavLink>
            <ResponsiveNavLink method='post' href={route('logout')} as='button'>
                {t('Logout')}
            </ResponsiveNavLink>
        </>
    );

    const DropdownLink = (
        <>
            <Dropdown.Link href={route('dashboard')}>{t('Home')}</Dropdown.Link>
            <Dropdown.Link href={route('profile.edit')}>{t('Profile')}</Dropdown.Link>
            <Dropdown.Link href={route('logout')} method='post' as='button'>
                {t('Logout')}
            </Dropdown.Link>
        </>
    );

    return (
        <div className='bg-gray-100 transition duration-300 ease-linear dark:bg-gray-900'>
            <div className='flex h-screen overflow-hidden'>
                <Sidebar sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen}>
                    <SideBarLink
                        href={route('applications.show', application.slug)}
                        active={route().current('applications.show', application.slug)}
                        svg={<Svg type={'dashboard'} variant={'sideBar'} />}
                    >
                        {t('App Dashboard')}
                    </SideBarLink>

                    <SideBarLink
                        href={route('employees.index', application.slug)}
                        active={route().current('employees.index', application.slug)}
                        svg={<Svg type={'employees'} variant={'sideBar'} />}
                    >
                        {t('Employees')}
                    </SideBarLink>

                    <SideBarLink
                        href={route('workstations.index', application.slug)}
                        active={route().current('workstations.index', application.slug)}
                        svg={<Svg type={'workstations'} variant={'sideBar'} />}
                    >
                        {t('Workstations')}
                    </SideBarLink>

                    <SideBarLink
                        href={route('categories.index', application.slug)}
                        active={route().current('categories.index', application.slug)}
                        svg={<Svg type={'categories'} variant={'sideBar'} />}
                    >
                        {t('Categories')}
                    </SideBarLink>

                    <SideBarLink
                        href={route('dishes.index', application.slug)}
                        active={route().current('dishes.index', application.slug)}
                        svg={<Svg type={'dishes'} variant={'sideBar'} />}
                    >
                        {t('Dishes')}
                    </SideBarLink>

                    <SideBarLink
                        href={route('products.index', application.slug)}
                        active={route().current('products.index', application.slug)}
                        svg={<Svg type={'products'} variant={'sideBar'} />}
                    >
                        {t('Products')}
                    </SideBarLink>

                    <SideBarLink
                        href={route('transactions.index', application.slug)}
                        active={route().current('transactions.index', application.slug)}
                        svg={<Svg type={'transactions'} variant={'sideBar'} />}
                    >
                        {t('Transactions')}
                    </SideBarLink>
                </Sidebar>

                <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
                    <Header
                        user={auth.customer}
                        title={application.name}
                        avatarPath={auth.avatarPath}
                        RespNavLink={RespNavLink}
                        DropdownLink={DropdownLink}
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
