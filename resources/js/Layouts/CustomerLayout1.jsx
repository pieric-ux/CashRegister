import CustomerNavigation from "@/Navigations/CustomerNavigations";
import SideBarLink from "@/Components/SideBarLink";

export default function CustomerLayout1({ user, header, children }) {

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">

            <CustomerNavigation user={user} />

            {/*{header && (
                <header className="bg-white dark:bg-gray-800 shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}*/}
            <div className="flex">
                <aside className="hidden z-50 w-64 h-screen sm:block">
                    <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                        <ul className="space-y-2 font-medium">
                            <li>
                                <SideBarLink href={route('dashboard')} active={route().current('dashboard')}
                                    svg={
                                        <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM288 96a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM256 416c35.3 0 64-28.7 64-64c0-17.4-6.9-33.1-18.1-44.6L366 161.7c5.3-12.1-.2-26.3-12.3-31.6s-26.3 .2-31.6 12.3L257.9 288c-.6 0-1.3 0-1.9 0c-35.3 0-64 28.7-64 64s28.7 64 64 64zM176 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM96 288a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm352-32a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
                                        </svg>}>
                                    Dashboard
                                </SideBarLink>
                            </li>
                            <li>
                                <SideBarLink href={route('profile.edit')} active={route().current('profile.edit')}
                                    svg={
                                        <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                            <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                                        </svg>}>
                                    Profile
                                </SideBarLink>
                            </li>
                        </ul>
                    </div>
                </aside>
                <main className="w-full">{children}</main>
            </div>
        </div>
    );
}
