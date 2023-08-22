import Header from "@/Components/Header";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import Dropdown from "@/Components/Dropdown";
import { useTranslation } from "react-i18next";

export default function EmployeeLayout({ auth, children, localization }) {
    const { t } = useTranslation();
    const RespNavLink = (
        <>
            <ResponsiveNavLink href={route('cashregister.index')} active={route().current('cashregister.index')}>
                {t('Cash Register')}
            </ResponsiveNavLink>
            <ResponsiveNavLink href={route('employee-profil.index')} active={route().current('employee-profil.index')}>
                {t('Profile')}
            </ResponsiveNavLink>
            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                {t('Logout')}
            </ResponsiveNavLink>
        </>
    );
    const DropdownLink = (
        <>
            <Dropdown.Link href={route('cashregister.index')}>{t('Cash Register')}</Dropdown.Link>
            <Dropdown.Link href={route('employee-profil.index')}>{t('Profile')}</Dropdown.Link>
            <Dropdown.Link href={route('logout')} method="post" as="button">{t('Logout')}</Dropdown.Link>
        </>
    );
    return (
        <div className="bg-gray-100 dark:bg-gray-900 transition ease-linear duration-300">
            <div className="flex h-screen overflow-hidden">
                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                    <Header user={auth.employee} title={t(auth.employee.cr_workstations.name)} avatarPath={auth.avatarPath} RespNavLink={RespNavLink} DropdownLink={DropdownLink} localization={localization} />
                    <main>
                        <div className="max-w-7xl mx-auto py-12">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}