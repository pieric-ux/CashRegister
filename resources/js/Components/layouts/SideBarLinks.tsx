import { Svg } from '@/Components/ui/svg/Svg';
import { useTranslation } from 'react-i18next';
import { SidebarLink } from '@/Components/ui/sidebar/sidebarLink';
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
                <SidebarLink
                    key={index}
                    href={slug !== undefined ? route(item.route, slug) : route(item.route)}
                    active={
                        slug !== undefined
                            ? route().current(item.route, slug)
                            : item.active !== undefined
                              ? route().current(item.route) || route().current(item.active)
                              : route().current(item.route)
                    }
                    svg={<Svg type={item.typeSvg} variant={'sideBar'} />}
                >
                    {t(item.label)}
                </SidebarLink>
            ))}
        </>
    );
}
