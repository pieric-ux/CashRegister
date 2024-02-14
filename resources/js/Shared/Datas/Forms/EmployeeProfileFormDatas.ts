import { type Employee, type EmployeeProfileFormDatas } from '@/Shared/Types/EmployeeTypes';

export const getDefaultValues = (employee?: Employee): Partial<Employee> => {
    return {
        first_name: employee?.first_name || '',
        last_name: employee?.last_name || '',
        phone: employee?.phone || '',
        email: employee?.email || '',
    };
};

export const formDatas: EmployeeProfileFormDatas[] = [
    {
        name: 'first_name',
        label: 'First Name',
        isFocused: true,
    },
    {
        name: 'last_name',
        label: 'Last Name',
    },
    {
        name: 'phone',
        label: 'Phone',
        type: 'tel',
    },
    {
        name: 'email',
        label: 'Email',
        type: 'email',
    },
];
