import Dropdown from "@/Components/Dropdown";
import Header from "@/Components/Header";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { useTranslation } from "react-i18next";

export default function EmployeeLayout({ auth, children, localization }) {
    const { t } = useTranslation();

    {
        // Flavien: peut être fait dans un autre composant ou en dehors de ce composant pour éviter de le refaire à chaque rendu
        /* Responsive NavLink components */
    }
    const RespNavLink = (
        <>
            <ResponsiveNavLink
                href={route("cashregister.index")}
                active={route().current("cashregister.index")}
            >
                {t("Cash Register")}
            </ResponsiveNavLink>
            <ResponsiveNavLink
                href={route("employee-profil.index")}
                active={route().current("employee-profil.index")}
            >
                {t("Profile")}
            </ResponsiveNavLink>
            <ResponsiveNavLink method="post" href={route("logout")} as="button">
                {t("Logout")}
            </ResponsiveNavLink>
        </>
    );

    {
        // Flavien: peut être fait dans un autre composant ou en dehors de ce composant pour éviter de le refaire à chaque rendu
        /* Dropdown Link components */
    }
    const DropdownLink = (
        <>
            <Dropdown.Link href={route("cashregister.index")}>
                {t("Cash Register")}
            </Dropdown.Link>
            <Dropdown.Link href={route("employee-profil.index")}>
                {t("Profile")}
            </Dropdown.Link>
            <Dropdown.Link href={route("logout")} method="post" as="button">
                {t("Logout")}
            </Dropdown.Link>
        </>
    );
    return (
        <div className="bg-gray-100 transition duration-300 ease-linear dark:bg-gray-900">
            <div className="flex h-screen overflow-hidden">
                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                    <Header
                        user={auth.employee}
                        title={t(auth.employee.cr_workstations.name)}
                        avatarPath={auth.avatarPath}
                        RespNavLink={RespNavLink}
                        DropdownLink={DropdownLink}
                        localization={localization}
                    />
                    <main>
                        <div className="mx-auto max-w-7xl py-12">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
