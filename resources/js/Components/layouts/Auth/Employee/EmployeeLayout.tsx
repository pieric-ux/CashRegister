import { type ReactNode } from 'react';
import { usePage } from '@inertiajs/react';
import Header from '@/Components/layouts/Header';
import { DropDownNavEmployeeLayoutDatas } from '@/Shared/Datas/Navigation/DropdownNavDatas';
import { DrawerNavEmployeeLayoutDatas } from '@/Shared/Datas/Navigation/DrawerNavDatas';

interface EmployeeLayoutProps {
    children: ReactNode;
}

export default function EmployeeLayout({ children }: EmployeeLayoutProps): JSX.Element {
    const { employeeAuth } = usePage().props;
    const { employee, avatarPath } = employeeAuth;
    return (
        <div className='bg-background transition duration-300 ease-linear'>
            <div className='h-screen flex-col'>
                <Header
                    user={employee}
                    avatarPath={avatarPath}
                    title={employee.cr_workstations.name}
                    dropdownMenuDatas={DropDownNavEmployeeLayoutDatas}
                    drawerMenuDatas={DrawerNavEmployeeLayoutDatas}
                />
                <main className='container space-y-6 py-8'>{children}</main>
            </div>
        </div>
    );
}
