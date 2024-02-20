import { type ReactNode } from 'react';
import { Svg } from '@/Components/ui/svg/Svg';
import { Button } from '@/Components/ui/button/button';
import { type Customer } from '@/Shared/Types/CustomerTypes';
import { type Employee } from '@/Shared/Types/EmployeeTypes';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/Components/ui/drawer/drawer';
import { ScrollArea } from '@radix-ui/react-scroll-area';

interface DrawerMenuProps {
    user: Customer | Employee;
    children: ReactNode;
}

export default function DrawerMenu({ user, children }: DrawerMenuProps): JSX.Element {
    return (
        <Drawer>
            <DrawerTrigger
                asChild
                className='focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'
            >
                <Button variant={'outline'} size={'icon'}>
                    <Svg variant={'sideBar'} type={'hamburger'} />
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <ScrollArea>
                    <DrawerHeader>
                        <DrawerTitle>{user.first_name}</DrawerTitle>
                        <DrawerDescription>{user.email}</DrawerDescription>
                    </DrawerHeader>
                    {children}
                    <DrawerFooter>
                        <DrawerClose
                            asChild
                            className='self-end focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'
                        >
                            <Button variant={'outline'} size={'icon'}>
                                <Svg variant={'sideBar'} type={'close'} />
                            </Button>
                        </DrawerClose>
                    </DrawerFooter>
                </ScrollArea>
            </DrawerContent>
        </Drawer>
    );
}
