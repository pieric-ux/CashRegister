import { useWindowSize } from 'usehooks-ts';
import { Svg } from '@/Components/ui/svg/Svg';
import { useState, type ReactNode } from 'react';
import { Button } from '@/Components/ui/button/button';
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

interface DrawerMenuProps<T> {
    user: T;
    children: ReactNode;
}

export default function DrawerMenu<T>({ user, children }: DrawerMenuProps<T>): JSX.Element {
    const [open, setOpen] = useState(false);
    const { width } = useWindowSize();

    open && width > 639 && setOpen(false);

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger
                asChild
                className='focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:hidden'
            >
                <Button variant={'outline'} size={'icon'}>
                    <Svg variant={'sideBar'} type={'hamburger'} />
                </Button>
            </DrawerTrigger>
            <DrawerContent>
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
            </DrawerContent>
        </Drawer>
    );
}
