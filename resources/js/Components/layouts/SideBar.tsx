import clsx from 'clsx';
import { type ReactNode } from 'react';
import { Link } from '@inertiajs/react';
import { Svg } from '@/Components/ui/svg/Svg';
import { Button } from '@/Components/ui/button/button';
import ApplicationLogo from '@/Components/logos/ApplicationLogo';
import ApplicationLogoDark from '@/Components/logos/ApplicationLogoDark';
import { useWindowSize, useEventListener, useLocalStorage } from 'usehooks-ts';
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
    const { width } = useWindowSize();

    const isModal = width > 639 && width < 1536;

    const handleResize = (): void => {
        setOpen(width > 1535);
    };
    useEventListener('resize', handleResize);

    const handleClose = (): void => {
        if (width > 639 && width < 1536) {
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
