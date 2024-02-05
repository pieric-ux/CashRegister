import ApplicationLogo from '@/Components/logos/ApplicationLogo';
import ApplicationLogoDark from '@/Components/logos/ApplicationLogoDark';
import { Card, CardHeader } from '@/Components/ui/card/card';
import { Link } from '@inertiajs/react';
import { type ReactNode } from 'react';

export default function GuestLayout({ children }: { children: ReactNode }): JSX.Element {
    return (
        <div className='flex min-h-screen flex-col items-center justify-center bg-background'>
            <Card className='w-full sm:max-w-md'>
                <CardHeader className='space-y-6'>
                    <Link href='/'>
                        <ApplicationLogo className='m-auto block dark:hidden' />
                        <ApplicationLogoDark className='m-auto hidden dark:block' />
                    </Link>
                </CardHeader>
                {children}
            </Card>
        </div>
    );
}
