import { type Auth, type ForgotPasswordFormDatas } from '@/Shared/Types/AuthTypes';

export const defaultValues: Auth = {
    email: '',
};

export const formDatas: ForgotPasswordFormDatas = {
    name: 'email',
    label: 'Email',
    type: 'email',
    isFocused: true,
};
