import { Head } from '@inertiajs/react';
import { Card, CardHeader } from '@/Components/ui/card/card';
import CR_AppAdminLayout from '@/Layouts/CR_AppAdminLayout';

export default function Dashboard({ customerAuth, application, localization }) {
    return (
        <CR_AppAdminLayout
            auth={customerAuth}
            application={application}
            localization={localization}
        >
            <Head title={application.name} />

            <div className='mx-auto max-w-7xl sm:px-6 lg:px-8'>
                <Card>
                    <CardHeader>{application.name}</CardHeader>
                </Card>
            </div>
        </CR_AppAdminLayout>
    );
}
