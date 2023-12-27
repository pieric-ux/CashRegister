import ApplicationLogo from "@/Components/ApplicationLogo";
import ApplicationLogoDark from "@/Components/ApplicationLogoDark";
import { Link } from "@inertiajs/react";

export default function Guest({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 pt-6 dark:bg-gray-900">
            <div>
                <Link href="/">
                    <ApplicationLogo className="m-auto block dark:hidden" />
                    <ApplicationLogoDark className="m-auto hidden dark:block" />
                </Link>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md dark:bg-gray-800 sm:max-w-md sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
