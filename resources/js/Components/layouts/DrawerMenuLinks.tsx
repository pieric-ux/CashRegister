import { useTranslation } from 'react-i18next';
import { DrawerLink } from '@/Components/ui/drawer/drawerLink';
import { type NavigationDatas } from '@/Shared/Types/NavigationTypes';
import { DrawerClose } from '../ui/drawer/drawer';

interface DrawerMenuLinksProps {
    datas: NavigationDatas[];
    slug?: string;
}

export default function DrawerMenuLinks({ datas, slug }: DrawerMenuLinksProps): JSX.Element {
    const { t } = useTranslation();
    return (
        <div className='overflow-auto'>
            {datas.map((item, index) => (
                <DrawerClose asChild>
                    <DrawerLink
                        key={index}
                        href={slug ? route(item.route, slug) : route(item.route)}
                        active={
                            slug ? route().current(item.route, slug) : route().current(item.route)
                        }
                        method={item.route === 'logout' ? 'post' : undefined}
                        as={'button'}
                    >
                        {t(item.label)}
                    </DrawerLink>
                </DrawerClose>
            ))}
        </div>
    );
}
