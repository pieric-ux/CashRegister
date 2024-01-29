import clsx from 'clsx';
import { Link } from '@inertiajs/react';
import { Svg } from '@/Components/ui/svg/Svg';
import { type ReactNode, useState } from 'react';
import useLocalStorage from '@/Hooks/useLocalStorage';
import { Button } from '@/Components/ui/button/button';
import ApplicationLogo from '@/Components/logos/ApplicationLogo';
import ApplicationLogoDark from '@/Components/logos/ApplicationLogoDark';
import {
    Sidebar,
    SidebarClose,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarTrigger,
} from '@/Components/ui/sidebar/sidebar';

interface SideBarProps {
    children: ReactNode;
}

export default function SideBar({ children }: SideBarProps): JSX.Element {
    const [open, setOpen] = useLocalStorage('sideBarOpen', true);
    const [isModal, setIsModal] = useState(
        () => window.matchMedia('(min-width: 640px) and (max-width: 1535px)').matches,
    );

    const handleResize = (): void => {
        setIsModal(window.matchMedia('(min-width: 640px) and (max-width: 1535px)').matches);
        setOpen(window.matchMedia('(min-width: 1536px').matches);
    };
    window.addEventListener('resize', handleResize);

    const handleClose = (): void => {
        if (window.matchMedia('(min-width: 640px) and (max-width: 1535px)').matches) {
            setOpen(false);
        }
    };

    return (
        <Sidebar open={open} modal={isModal}>
            <SidebarTrigger
                asChild
                className={clsx(
                    'fixed left-5 top-5 z-50 hidden',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                    { 'sm:flex': !open },
                )}
                onClick={() => setOpen(true)}
            >
                <Button variant={'outline'} size={'icon'}>
                    <Svg variant={'sideBar'} type={'hamburger'} />
                </Button>
            </SidebarTrigger>
            <SidebarContent
                onEscapeKeyDown={handleClose}
                onPointerDownOutside={handleClose}
                className='space-y-2 px-3'
            >
                <SidebarHeader>
                    <Link
                        href='/'
                        className={
                            'rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'
                        }
                        aria-label='Welcome Page'
                    >
                        <ApplicationLogo className='block dark:hidden' />
                        <ApplicationLogoDark className='hidden dark:block' />
                    </Link>
                </SidebarHeader>
                {children}
                <SidebarFooter>
                    <SidebarClose
                        asChild
                        className='absolute left-60 top-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background 2xl:hidden'
                        onClick={() => setOpen(false)}
                    >
                        <Button variant={'outline'} size={'icon'}>
                            <Svg variant={'sideBar'} type={'close'} />
                        </Button>
                    </SidebarClose>
                </SidebarFooter>
            </SidebarContent>
        </Sidebar>
    );
}
