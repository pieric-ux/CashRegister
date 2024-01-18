import { type Auth, type ConfirmDeleteFormDatas } from '../Types/AuthTypes';

export const defaultValues: Auth = {
    password: '',
};

export const formDatas: ConfirmDeleteFormDatas = {
    name: 'password',
    label: 'Password',
    srOnly: true,
    type: 'password',
    isFocused: true,
    autoComplete: 'current-password',
    placeholder: 'Password',
};
