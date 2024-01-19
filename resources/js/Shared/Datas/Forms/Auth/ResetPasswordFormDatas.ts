import { type Auth, type ResetPasswordFormDatas } from '@/Shared/Types/AuthTypes';

export const getDefaultValues = ({ token, email }: { token: string; email: string }): Auth => {
    return { token, email, password: '', password_confirmation: '' };
};

export const formDatas: ResetPasswordFormDatas[] = [
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
        autoComplete: 'new-password',
    },
    {
        name: 'password_confirmation',
        label: 'Confirm Password',
        type: 'password',
    },
];
