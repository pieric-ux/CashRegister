import Header from "@/Components/Header";
import Sidebar from "@/Components/SideBar";
import SideBarLink from "@/Components/SideBarLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import Dropdown from "@/Components/Dropdown";
import useLocalStorage from "@/Hooks/useLocalStorage";

export default function CustomerLayout({ auth, children }) {
    const [sideBarOpen, setSideBarOpen] = useLocalStorage("sideBarOpen", false);
    const RespNavLink = (
        <>
            <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                Dashboard
            </ResponsiveNavLink>
            <ResponsiveNavLink href={route('profile.edit')} active={route().current('profile.edit')}>
                Profile
            </ResponsiveNavLink>
            <ResponsiveNavLink href={route('applications.index')} active={route().current('applications.index')}>
                Applications
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
                    <SideBarLink href={route('dashboard')} active={route().current('dashboard')}
                        svg={
                            <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM288 96a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM256 416c35.3 0 64-28.7 64-64c0-17.4-6.9-33.1-18.1-44.6L366 161.7c5.3-12.1-.2-26.3-12.3-31.6s-26.3 .2-31.6 12.3L257.9 288c-.6 0-1.3 0-1.9 0c-35.3 0-64 28.7-64 64s28.7 64 64 64zM176 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM96 288a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm352-32a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
                            </svg>}>
                        Dashboard
                    </SideBarLink>

                    <SideBarLink href={route('profile.edit')} active={route().current('profile.edit')}
                        svg={
                            <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                            </svg>}>
                        Profile
                    </SideBarLink>

                    <SideBarLink href={route('applications.index')} active={route().current('applications.index') || route().current('applications.create')}
                        svg={
                            <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path d="M64 0C46.3 0 32 14.3 32 32V96c0 17.7 14.3 32 32 32h80v32H87c-31.6 0-58.5 23.1-63.3 54.4L1.1 364.1C.4 368.8 0 373.6 0 378.4V448c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V378.4c0-4.8-.4-9.6-1.1-14.4L488.2 214.4C483.5 183.1 456.6 160 425 160H208V128h80c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H64zM96 48H256c8.8 0 16 7.2 16 16s-7.2 16-16 16H96c-8.8 0-16-7.2-16-16s7.2-16 16-16zM64 432c0-8.8 7.2-16 16-16H432c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16zm48-168a24 24 0 1 1 0-48 24 24 0 1 1 0 48zm120-24a24 24 0 1 1 -48 0 24 24 0 1 1 48 0zM160 344a24 24 0 1 1 0-48 24 24 0 1 1 0 48zM328 240a24 24 0 1 1 -48 0 24 24 0 1 1 48 0zM256 344a24 24 0 1 1 0-48 24 24 0 1 1 0 48zM424 240a24 24 0 1 1 -48 0 24 24 0 1 1 48 0zM352 344a24 24 0 1 1 0-48 24 24 0 1 1 0 48z" />
                            </svg>}>
                        Applications
                    </SideBarLink>
                </Sidebar>
                {/* SideBar Start*/}

                {/* Content Area Start*/}
                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
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
