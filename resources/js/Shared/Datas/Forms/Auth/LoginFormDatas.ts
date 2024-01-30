import { type Auth, type LoginFormDatas } from '@/Shared/Types/AuthTypes';

export const defaultValues: Auth = {
    email: '',
    password: '',
    remember: false,
};

export const formDatas: LoginFormDatas[] = [
    {
        name: 'email',
        label: 'Email',
        type: 'email',
        isFocused: true,
        autoComplete: 'username',
    },
    {
        name: 'password',
        label: 'Password',
        type: 'password',
        autoComplete: 'current-password',
    },
];

export const employeeFormDatas: LoginFormDatas[] = [
    {
        name: 'passwordless',
        label: 'Activation Code',
    },
];
