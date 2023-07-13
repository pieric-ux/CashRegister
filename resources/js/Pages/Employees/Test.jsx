import { Link } from "@inertiajs/react";

export default function Test() {
    return (
        <>
            <div>Hello</div>
            <Link href={route('employees.logout')} method="post">Logout</Link>
        </>
    );
}