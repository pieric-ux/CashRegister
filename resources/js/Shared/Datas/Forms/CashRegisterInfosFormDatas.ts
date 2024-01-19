import {
    type CashRegister,
    type CashRegisterInfosFormDatas,
} from '@/Shared/Types/CashRegisterTypes';

export const getDefaultValues = (application: CashRegister, isUpdate: boolean): CashRegister => {
    return {
        name: isUpdate ? application?.name : '',
        description: isUpdate ? application?.description : '',
        start_date: isUpdate ? application?.start_date : '',
        end_date: isUpdate ? application?.end_date : '',
        location: isUpdate ? application?.location : '',
        website: isUpdate ? application?.website : '',
    };
};

export const formDatas: CashRegisterInfosFormDatas[] = [
    {
        name: 'name',
        label: 'Name',
        isFocused: true,
    },
    {
        name: 'description',
        label: 'Description',
    },
    {
        name: 'start_date',
        label: 'Start Date',
        type: 'date',
    },
    {
        name: 'end_date',
        label: 'End Date',
        type: 'date',
    },
    {
        name: 'location',
        label: 'Location',
    },
    {
        name: 'website',
        label: 'Website',
        placeholder: 'https://',
        pattern: 'https://.*',
    },
];
