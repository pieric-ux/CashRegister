import DrawerMenu from './DrawerMenu';
import DropdownMenu from './DropdownMenu';
import { useWindowSize } from 'usehooks-ts';
import { useTranslation } from 'react-i18next';
import DrawerMenuLinks from './DrawerMenuLinks';
import DropdownMenuLinks from './DropdownMenuLinks';
import { type Customer } from '@/Shared/Types/CustomerTypes';
import { type Employee } from '@/Shared/Types/EmployeeTypes';
import ThemeSwitcher from '../features/theme-switcher/ThemeSwitcher';
import { type NavigationDatas } from '@/Shared/Types/NavigationTypes';
import LanguageSwitcher from '../features/language-switcher/LanguageSwitcher';

interface HeaderProps {
    user: Customer | Employee;
    title?: string;
    avatarPath?: string;
    dropdownMenuDatas: NavigationDatas[];
    drawerMenuDatas: NavigationDatas[];
    slug?: string;
}

export default function Header({
    user,
    title,
    avatarPath,
    dropdownMenuDatas,
    drawerMenuDatas,
    slug,
}: HeaderProps): JSX.Element {
    const { t } = useTranslation();
    const { width } = useWindowSize();
    const isMobile = width < 640;

    return (
        <header className='sticky top-0 z-40 flex h-20 w-full border-b border-border bg-card drop-shadow-sm transition duration-300 ease-linear'>
            {title && (
                <div className='mx-5 flex items-center justify-center sm:absolute sm:left-1/2 sm:top-1/2 sm:mx-0 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:transform'>
                    <h1 className='text-xl font-semibold text-foreground sm:text-2xl'>
                        {t(title)}
                    </h1>
                </div>
            )}

            <div className='absolute right-5 flex h-full items-center justify-center gap-2'>
                <LanguageSwitcher />

                <ThemeSwitcher />

                {isMobile ? (
                    <DrawerMenu user={user}>
                        <DrawerMenuLinks datas={drawerMenuDatas} slug={slug} />
                    </DrawerMenu>
                ) : (
                    <DropdownMenu user={user} avatarPath={avatarPath}>
                        <DropdownMenuLinks datas={dropdownMenuDatas} />
                    </DropdownMenu>
                )}
            </div>
        </header>
    );
}
