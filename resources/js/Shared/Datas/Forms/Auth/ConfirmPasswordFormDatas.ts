import { type Auth, type ConfirmPasswordFormDatas } from '../Types/AuthTypes';

export const defaultValues: Auth = {
    password: '',
};

export const formDatas: ConfirmPasswordFormDatas = {
    name: 'password',
    label: 'Password',
    type: 'password',
    isFocused: true,
};
