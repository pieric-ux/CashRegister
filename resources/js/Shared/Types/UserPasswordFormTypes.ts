export interface UserPasswordFormInput {
    current_password: string;
    password: string;
    password_confirmation: string;
}

export interface UserPasswordFormDatas {
    name: 'current_password' | 'password' | 'password_confirmation';
    label: string;
    type: string;
    autoComplete: string;
}
