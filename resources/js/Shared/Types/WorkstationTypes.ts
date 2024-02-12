export interface Workstation {
    id?: number;
    name: string;
    fk_cr_modules_id?: number;
    created_at?: string;
    updated_at?: string;
}

export interface WorkstationInfosFormDatas {
    name: 'name';
    label: string;
    isFocused?: boolean;
}
