import { type ReactElement, type FC } from 'react';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar/avatar';
import {
    Dropdown,
    DropdownContent,
    DropdownItem,
    DropdownTrigger,
} from '@/Components/ui/dropdown/dropdown';
import { usePage } from '@inertiajs/react';

interface DropdownMenuProps {
    dropdownLinks: ReactElement[];
}

const DropdownMenu: FC<DropdownMenuProps> = ({ dropdownLinks }) => {
    const { customerAuth } = usePage().props;
    return (
        <Dropdown>
            <DropdownTrigger className='flex items-center justify-center text-sm font-medium leading-4'>
                {customerAuth.customer.first_name}
                <Avatar className='ml-2'>
                    <AvatarImage src={customerAuth.avatarPath} alt='avatar' />
                    <AvatarFallback>
                        {customerAuth.customer.first_name.charAt(0) +
                            customerAuth.customer.last_name.charAt(0)}
                    </AvatarFallback>
                </Avatar>
                <ChevronDownIcon className='-mr-0.5 ml-1 h-4 w-4' />
            </DropdownTrigger>
            <DropdownContent>
                {dropdownLinks.map((link, index) => (
                    <DropdownItem key={index}>{link}</DropdownItem>
                ))}
            </DropdownContent>
        </Dropdown>
    );
};

export default DropdownMenu;
