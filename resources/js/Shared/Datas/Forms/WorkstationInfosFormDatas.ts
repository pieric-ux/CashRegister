import { type Workstation, type WorkstationInfosFormDatas } from '@/Shared/Types/WorkstationTypes';

export const getDefaultValues = (workstation: Workstation, isUpdate: boolean): Workstation => {
    return { name: isUpdate ? workstation?.name : '' };
};

export const formDatas: WorkstationInfosFormDatas = {
    name: 'name',
    label: 'Name',
    isFocused: true,
};
