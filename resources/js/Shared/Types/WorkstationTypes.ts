export interface Workstation {
    id?: number;
    name: string;
    created_at?: string;
    updated_at?: string;
}

export interface WorkstationInfosFormDatas {
    name: 'name';
    label: string;
    isFocused?: boolean;
}
