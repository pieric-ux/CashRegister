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
            <ResponsiveNavLink href={route('dashboard')}>
                Home
            </ResponsiveNavLink>
            <ResponsiveNavLink href={route('applications.show', application.slug)} active={route().current('applications.show', application.slug)}>
                App Dashboard
            </ResponsiveNavLink>
            <ResponsiveNavLink href={route('employees.index', application.slug)} active={route().current('employees.index', application.slug)}>
                Employees
            </ResponsiveNavLink>
            <ResponsiveNavLink href={route('workstations.index', application.slug)} active={route().current('workstations.index', application.slug)}>
                Workstations
            </ResponsiveNavLink>
            <ResponsiveNavLink href={route('categories.index', application.slug)} active={route().current('categories.index', application.slug)}>
                Categories
            </ResponsiveNavLink>
            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                Log Out
            </ResponsiveNavLink>
        </>
    );
    const DropdownLink = (
        <>
            <Dropdown.Link href={route('dashboard')}>Home</Dropdown.Link>
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

                    <SideBarLink href={route('employees.index', application.slug)} active={route().current('employees.index', application.slug)}
                        svg={
                            <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                <path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z" />
                            </svg>}>
                        Employees
                    </SideBarLink>

                    <SideBarLink href={route('workstations.index', application.slug)} active={route().current('workstations.index', application.slug)}
                        svg={
                            <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                <path d="M218.3 8.5c12.3-11.3 31.2-11.3 43.4 0l208 192c6.7 6.2 10.3 14.8 10.3 23.5H336c-19.1 0-36.3 8.4-48 21.7V208c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16v64c0 8.8 7.2 16 16 16h64V416H112c-26.5 0-48-21.5-48-48V256H32c-13.2 0-25-8.1-29.8-20.3s-1.6-26.2 8.1-35.2l208-192zM352 304V448H544V304H352zm-48-16c0-17.7 14.3-32 32-32H560c17.7 0 32 14.3 32 32V448h32c8.8 0 16 7.2 16 16c0 26.5-21.5 48-48 48H544 352 304c-26.5 0-48-21.5-48-48c0-8.8 7.2-16 16-16h32V288z" />
                            </svg>}>
                        Workstations
                    </SideBarLink>

                    <SideBarLink href={route('categories.index', application.slug)} active={route().current('categories.index', application.slug)}
                        svg={
                            <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M224 80c0-26.5-21.5-48-48-48H80C53.5 32 32 53.5 32 80v96c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48V80zm0 256c0-26.5-21.5-48-48-48H80c-26.5 0-48 21.5-48 48v96c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48V336zM288 80v96c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48H336c-26.5 0-48 21.5-48 48zM480 336c0-26.5-21.5-48-48-48H336c-26.5 0-48 21.5-48 48v96c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48V336z" />
                            </svg>}>
                        Categories
                    </SideBarLink>
                </Sidebar>
                {/* SideBar Start*/}

                {/* Content Area Start*/}
                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                    {/* Header Start*/}
                    <Header user={auth.customer} title={application.name} avatarPath={auth.avatarPath} RespNavLink={RespNavLink} DropdownLink={DropdownLink} sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} />


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
