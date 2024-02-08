import { type ReactNode } from 'react';
import { usePage } from '@inertiajs/react';
import Header from '@/Components/layouts/Header';
import { DrawerNavEmployeeLayoutDatas } from '@/Shared/Datas/Navigation/DrawerNavDatas';
import { DropDownNavEmployeeLayoutDatas } from '@/Shared/Datas/Navigation/DropdownNavDatas';

interface EmployeeLayoutProps {
    children: ReactNode;
}

export default function EmployeeLayout({ children }: EmployeeLayoutProps): JSX.Element {
    const { employee } = usePage<InertiaPageProps>().props;
    const avatarPath = employee.media.find(
        /* eslint-disable @typescript-eslint/naming-convention */
        ({ collection_name }) => collection_name === 'avatars-employees',
    )?.original_url;

    return (
        <div className='bg-background transition duration-300 ease-linear'>
            <div className='min-h-screen flex-col'>
                <Header
                    user={employee}
                    avatarPath={avatarPath}
                    title={employee?.cr_workstations?.name}
                    dropdownMenuDatas={DropDownNavEmployeeLayoutDatas}
                    drawerMenuDatas={DrawerNavEmployeeLayoutDatas}
                />
                <main className='container h-[calc(100vh-5rem)] space-y-6 py-4 md:py-6 lg:py-8'>
                    {children}
                </main>
            </div>
        </div>
    );
}
