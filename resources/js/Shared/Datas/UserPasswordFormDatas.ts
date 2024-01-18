import { type UserPasswordFormDatas } from '@/Shared/Types/UserPasswordFormTypes';
import { type Auth } from '../Types/AuthTypes';

export const defaultValues: Auth = {
    current_password: '',
    password: '',
    password_confirmation: '',
};

export const formDatas: UserPasswordFormDatas[] = [
    {
        name: 'current_password',
        label: 'Current Password',
        type: 'password',
        autoComplete: 'current-password',
    },
    {
        name: 'password',
        label: 'New Password',
        type: 'password',
        autoComplete: 'new-password',
    },
    {
        name: 'password_confirmation',
        label: 'Confirm Password',
        type: 'password',
        autoComplete: 'new-password',
    },
];
