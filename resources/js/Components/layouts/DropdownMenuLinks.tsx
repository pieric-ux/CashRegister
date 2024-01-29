import { Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { DropdownItem } from '@/Components/ui/dropdown/dropdownItem';
import { type NavigationDatas } from '@/Shared/Types/NavigationTypes';

interface DropdownMenuLinksProps {
    datas: NavigationDatas[];
}

export default function DropdownMenuLinks({ datas }: DropdownMenuLinksProps): JSX.Element {
    const { t } = useTranslation();
    return (
        <>
            {datas.map((item, index) => (
                <DropdownItem key={index}>
                    <Link
                        href={route(item.route)}
                        className='block w-full'
                        method={item.route === 'logout' ? 'post' : undefined}
                        as={item.route === 'logout' ? 'button' : undefined}
                    >
                        {t(item.label)}
                    </Link>
                </DropdownItem>
            ))}
        </>
    );
}
