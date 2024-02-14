import { IconType } from '@/Components/ui/svg/Svg';

export interface NavigationDatas {
    route: string;
    active?: string;
    label: string;
    typeSvg?: IconType;
}
