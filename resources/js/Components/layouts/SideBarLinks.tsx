import { Svg } from '@/Components/ui/svg/Svg';
import { useTranslation } from 'react-i18next';
import { SheetLink } from '@/Components/ui/sheet/sheetLink';
import { type NavigationDatas } from '@/Shared/Types/NavigationTypes';

interface SideBarLinksProps {
    datas: NavigationDatas[];
    slug?: string;
}

export default function SideBarLinks({ datas, slug }: SideBarLinksProps): JSX.Element {
    const { t } = useTranslation();
    return (
        <>
            {datas.map((item, index) => (
                <SheetLink
                    key={index}
                    href={slug ? route(item.route, slug) : route(item.route)}
                    active={
                        slug
                            ? route().current(item.route, slug)
                            : item.active
                              ? route().current(item.route) || route().current(item.active)
                              : route().current(item.route)
                    }
                    svg={item.typeSvg ? <Svg type={item.typeSvg} variant={'sideBar'} /> : undefined}
                >
                    {t(item.label)}
                </SheetLink>
            ))}
        </>
    );
}
