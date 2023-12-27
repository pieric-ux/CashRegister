import { Link } from "@inertiajs/react";

export default function SideBarLink({
    active = false,
    className = "",
    svg,
    children,
    ...props
}) {
    return (
        <li>
            <Link
                {...props}
                className={
                    "flex items-center rounded-lg p-2 text-gray-900 transition duration-150 ease-in-out hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-offset-gray-800 " +
                    (active
                        ? "border-2 border-sky-400 dark:border-sky-600"
                        : "") +
                    className
                }
            >
                {svg}
                <span className="ml-3">{children}</span>
            </Link>
        </li>
    );
}
