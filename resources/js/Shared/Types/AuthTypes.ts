export interface Auth {
    email?: string;
    password?: string;
    current_password?: string;
    password_confirmation?: string;
    remember?: boolean;
    token?: string;
}

export interface ConfirmDeleteFormDatas {
    name: 'password';
    label: string;
    srOnly: boolean;
    type: string;
    isFocused: boolean;
    autoComplete: string;
    placeholder: string;
}
