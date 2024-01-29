import { useTranslation } from 'react-i18next';
import { DrawerLink } from '@/Components/ui/drawer/drawerLink';
import { type NavigationDatas } from '@/Shared/Types/NavigationTypes';

interface DrawerMenuLinksProps {
    datas: NavigationDatas[];
    slug?: string;
}

export default function DrawerMenuLinks({ datas, slug }: DrawerMenuLinksProps): JSX.Element {
    const { t } = useTranslation();
    return (
        <>
            {datas.map((item, index) => (
                <DrawerLink
                    key={index}
                    href={slug !== undefined ? route(item.route, slug) : route(item.route)}
                    active={
                        slug !== undefined
                            ? route().current(item.route, slug)
                            : route().current(item.route)
                    }
                    method={item.route === 'logout' ? 'post' : undefined}
                    as={item.route === 'logout' ? 'button' : undefined}
                >
                    {t(item.label)}
                </DrawerLink>
            ))}
        </>
    );
}
