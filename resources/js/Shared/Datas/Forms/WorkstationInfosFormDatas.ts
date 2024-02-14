import { type Workstation, type WorkstationInfosFormDatas } from '@/Shared/Types/WorkstationTypes';

export const getDefaultValues = (workstation?: Workstation): Workstation => {
    return { name: workstation?.name || '' };
};

export const formDatas: WorkstationInfosFormDatas = {
    name: 'name',
    label: 'Name',
    isFocused: true,
};
