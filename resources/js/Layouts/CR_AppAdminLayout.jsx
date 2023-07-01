import Header from "@/Components/Header";
import Sidebar from "@/Components/SideBar";
import SideBarLink from "@/Components/SideBarLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import Dropdown from "@/Components/Dropdown";
import useLocalStorage from "@/Hooks/useLocalStorage";

export default function CR_AppAdminLayout({ auth, application, children }) {
    const [sideBarOpen, setSideBarOpen] = useLocalStorage("sideBarOpen", false);
    const RespNavLink = (
        <>
            <ResponsiveNavLink href={route('applications.show', application.slug)} active={route().current('applications.show', application.slug)}>
                App Dashboard
            </ResponsiveNavLink>
            <ResponsiveNavLink href={route('workstations.index', application.slug)} active={route().current('workstations.index', application.slug)}>
                Workstations
            </ResponsiveNavLink>
            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                Log Out
            </ResponsiveNavLink>
        </>
    );
    const DropdownLink = (
        <>
            <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
            <Dropdown.Link href={route('logout')} method="post" as="button">Log Out</Dropdown.Link>
        </>
    );

    return (
        <div className="bg-gray-100 dark:bg-gray-900 transition ease-linear duration-300">

            <div className="flex h-screen overflow-hidden">
                {/* SideBar Start*/}
                <Sidebar sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen}>
                    <SideBarLink href={route('applications.show', application.slug)} active={route().current('applications.show', application.slug)}
                        svg={
                            <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM288 96a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM256 416c35.3 0 64-28.7 64-64c0-17.4-6.9-33.1-18.1-44.6L366 161.7c5.3-12.1-.2-26.3-12.3-31.6s-26.3 .2-31.6 12.3L257.9 288c-.6 0-1.3 0-1.9 0c-35.3 0-64 28.7-64 64s28.7 64 64 64zM176 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM96 288a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm352-32a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
                            </svg>}>
                        App Dashboard
                    </SideBarLink>

                    <SideBarLink href={route('workstations.index', application.slug)} active={route().current('workstations.index', application.slug)}
                        svg={
                            <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                <path d="M218.3 8.5c12.3-11.3 31.2-11.3 43.4 0l208 192c6.7 6.2 10.3 14.8 10.3 23.5H336c-19.1 0-36.3 8.4-48 21.7V208c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16v64c0 8.8 7.2 16 16 16h64V416H112c-26.5 0-48-21.5-48-48V256H32c-13.2 0-25-8.1-29.8-20.3s-1.6-26.2 8.1-35.2l208-192zM352 304V448H544V304H352zm-48-16c0-17.7 14.3-32 32-32H560c17.7 0 32 14.3 32 32V448h32c8.8 0 16 7.2 16 16c0 26.5-21.5 48-48 48H544 352 304c-26.5 0-48-21.5-48-48c0-8.8 7.2-16 16-16h32V288z" />
                            </svg>}>
                        Workstations
                    </SideBarLink>
                </Sidebar>
                {/* SideBar Start*/}

                {/* Content Area Start*/}
                <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                    {/* Header Start*/}
                    <Header user={auth.customer} avatarPath={auth.avatarPath} RespNavLink={RespNavLink} DropdownLink={DropdownLink} sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} />


                    {/* Header End*/}

                    {/* Main Content Start*/}
                    <main>
                        <div className="max-w-7xl mx-auto py-12">
                            {children}
                        </div>
                    </main>
                    {/* Main Content End*/}
                </div>
                {/* Content Area End*/}
            </div>
        </div>
    );
}
