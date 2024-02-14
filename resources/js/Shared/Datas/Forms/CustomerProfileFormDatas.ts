import {
    type Customer,
    type CustomerProfileFormInput,
    type CustomerProfileFormDatasObject,
} from '@/Shared/Types/CustomerTypes';

export const getDefaultValues = (customer?: Customer): CustomerProfileFormInput => {
    return {
        company_name: customer?.company_name || '',
        first_name: customer?.first_name || '',
        last_name: customer?.last_name || '',
        address: customer?.address || '',
        city: customer?.city || '',
        npa: customer?.npa || '',
        phone: customer?.phone || '',
        email: customer?.email || '',
        password: '',
        password_confirmation: '',
    };
};

export const formDatas: CustomerProfileFormDatasObject = {
    base: [
        {
            name: 'company_name',
            label: 'Company Name',
            autoComplete: 'organization',
            isFocused: true,
            facultative: true,
        },
        {
            name: 'first_name',
            label: 'First Name',
            autoComplete: 'given-name',
        },
        {
            name: 'last_name',
            label: 'Last Name',
            autoComplete: 'family-name',
        },
        {
            name: 'address',
            label: 'Address',
            autoComplete: 'street-address',
        },
    ],
    flex: [
        {
            name: 'city',
            label: 'City',
            autoComplete: 'address-level2',
        },
        {
            name: 'npa',
            label: 'NPA',
            autoComplete: 'postal-code',
        },
    ],
    update: [
        {
            name: 'phone',
            label: 'Phone',
            type: 'tel',
            autoComplete: 'tel',
        },
    ],
    end: {
        name: 'email',
        label: 'Email',
        type: 'email',
        autoComplete: 'username',
    },
    create: [
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
    ],
};
