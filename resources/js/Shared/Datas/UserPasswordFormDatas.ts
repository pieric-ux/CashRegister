import {
    type UserPasswordFormInput,
    type UserPasswordFormDatas,
} from '@/Shared/Types/UserPasswordFormTypes';

export const defaultValues: UserPasswordFormInput = {
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
