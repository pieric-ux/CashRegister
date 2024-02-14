import {
    type CashRegister,
    type CashRegisterInfosFormDatas,
} from '@/Shared/Types/CashRegisterTypes';

export const getDefaultValues = (cashRegisterModule?: CashRegister): Partial<CashRegister> => {
    return {
        name: cashRegisterModule?.name || '',
        description: cashRegisterModule?.description || '',
        start_date: cashRegisterModule?.start_date || '',
        end_date: cashRegisterModule?.end_date || '',
        location: cashRegisterModule?.location || '',
        website: cashRegisterModule?.website || '',
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
