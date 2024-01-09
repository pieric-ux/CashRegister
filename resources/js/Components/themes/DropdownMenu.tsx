import {
    Dropdown,
    DropdownContent,
    DropdownItem,
    DropdownTrigger,
} from '@/Components/ui/dropdown/dropdown';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar/avatar';

export default function DropdownMenu({ user, avatarPath, dropdownLinks }) {
    return (
        <Dropdown>
            <DropdownTrigger className='flex items-center justify-center text-sm font-medium leading-4'>
                {user.first_name}
                <Avatar className='ml-2'>
                    <AvatarImage src={avatarPath} alt='avatar' />
                    <AvatarFallback>
                        {user.first_name.charAt(0) + user.last_name.charAt(0)}
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
}
