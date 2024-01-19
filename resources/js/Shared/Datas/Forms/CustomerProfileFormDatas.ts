import {
    type Customer,
    type CustomerProfileFormInput,
    type CustomerProfileFormDataObject,
} from '@/Shared/Types/CustomerTypes';

export const getDefaultValues = (
    customer: Customer,
    isUpdate: boolean,
): CustomerProfileFormInput => {
    return {
        company_name: isUpdate ? customer?.company_name ?? '' : '',
        first_name: isUpdate ? customer?.first_name : '',
        last_name: isUpdate ? customer?.last_name : '',
        address: isUpdate ? customer?.address : '',
        city: isUpdate ? customer?.city : '',
        npa: isUpdate ? customer?.npa : '',
        phone: isUpdate ? customer?.phone ?? '' : '',
        email: isUpdate ? customer?.email : '',
        password: '',
        password_confirmation: '',
    };
};

export const formDatas: CustomerProfileFormDataObject = {
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
