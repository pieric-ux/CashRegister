import { type Employee, type EmployeeProfileFormDatas } from '@/Shared/Types/EmployeeTypes';

export const getDefaultValues = (employee: Employee, isUpdate: boolean): Partial<Employee> => {
    return {
        first_name: isUpdate ? employee?.first_name : '',
        last_name: isUpdate ? employee?.last_name : '',
        phone: isUpdate ? employee?.phone ?? '' : '',
        email: isUpdate ? employee?.email : '',
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
