export interface Auth {
    email?: string;
    password?: string;
    current_password?: string;
    password_confirmation?: string;
    remember?: boolean;
    token?: string;
    passwordless?: string;
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

export interface ConfirmPasswordFormDatas {
    name: 'password';
    label: string;
    type: string;
    isFocused: boolean;
}

export interface ForgotPasswordFormDatas {
    name: 'email';
    label: string;
    type: string;
    isFocused: true;
}

export interface LoginFormDatas {
    name: 'email' | 'password' | 'passwordless';
    label: string;
    type?: string;
    isFocused?: true;
    autoComplete?: string;
}

export interface ResetPasswordFormDatas {
    name: 'email' | 'password' | 'password_confirmation';
    label: string;
    type: string;
    isFocused?: boolean;
    autoComplete?: string;
}

export interface UserPasswordFormDatas {
    name: 'current_password' | 'password' | 'password_confirmation';
    label: string;
    type: string;
    autoComplete: string;
}
