import { type ReactNode } from 'react';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { type Customer } from '@/Shared/Types/CustomerTypes';
import { type Employee } from '@/Shared/Types/EmployeeTypes';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar/avatar';
import { Dropdown, DropdownContent, DropdownTrigger } from '@/Components/ui/dropdown/dropdown';

interface DropdownMenuProps {
    user: Customer | Employee;
    avatarPath?: string;
    children: ReactNode;
}

export default function DropdownMenu({
    user,
    avatarPath,
    children,
}: DropdownMenuProps): JSX.Element {
    return (
        <Dropdown>
            <DropdownTrigger className='flex items-center justify-center text-sm font-medium leading-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'>
                {user.first_name}
                {/* FIXME: flickering effect due to avatar fallback */}
                <Avatar className='ml-2'>
                    <AvatarImage src={avatarPath} alt='avatar' />
                    <AvatarFallback>
                        {user.first_name.charAt(0) + user.last_name.charAt(0)}
                    </AvatarFallback>
                </Avatar>
                <ChevronDownIcon className='-mr-0.5 ml-1 h-4 w-4' />
            </DropdownTrigger>
            <DropdownContent>{children}</DropdownContent>
        </Dropdown>
    );
}
