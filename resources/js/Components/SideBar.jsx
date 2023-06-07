import { Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import ApplicationLogoDark from './ApplicationLogoDark';

export default function SideBar({ children }) {
    return (
        <aside className="hidden sm:flex flex-col z-50 w-72 min-h-screen overflow-y-hidden bg-gray-50 dark:bg-gray-800 transition ease-linear duration-300">
            {/* SideBar Header*/}
            <header className="p-4">
                <Link href="/">
                    <ApplicationLogo className="block m-auto dark:hidden" />
                    <ApplicationLogoDark className="hidden dark:block m-auto" />
                </Link>
            </header>
            {/* SideBar Header*/}

            {/* SideBar Nav*/}
            <nav className='h-full mt-6 px-3 py-4 overflow-y-auto'>
                <ul className="space-y-2 font-medium">
                    {children}
                </ul>
            </nav>
            {/* SideBar Nav*/}

        </aside>
    );
}