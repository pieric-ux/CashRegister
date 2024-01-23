import {
    type CashRegister,
    type CashRegisterInfosFormDatas,
} from '@/Shared/Types/CashRegisterTypes';

export const getDefaultValues = (
    cashRegisterModule: CashRegister,
    isUpdate: boolean,
): CashRegister => {
    return {
        name: isUpdate ? cashRegisterModule?.name : '',
        description: isUpdate ? cashRegisterModule?.description ?? '' : '',
        start_date: isUpdate ? cashRegisterModule?.start_date ?? '' : '',
        end_date: isUpdate ? cashRegisterModule?.end_date ?? '' : '',
        location: isUpdate ? cashRegisterModule?.location ?? '' : '',
        website: isUpdate ? cashRegisterModule?.website ?? '' : '',
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
        placeholder: 'https',
        pattern: 'https://.*',
    },
];
