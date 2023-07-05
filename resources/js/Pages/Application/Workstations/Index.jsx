import CR_AppAdminLayout from "@/Layouts/CR_AppAdminLayout";
import { Head } from "@inertiajs/react";

export default function Index({ application, auth }) {
    return (
        <CR_AppAdminLayout
            auth={auth}
            application={application}
        >
            <Head title={application.name} />

            <div>
                Hello
            </div>

        </CR_AppAdminLayout>
    )
}