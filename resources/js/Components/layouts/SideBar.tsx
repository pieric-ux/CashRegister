import clsx from 'clsx';
import { type ReactNode } from 'react';
import { Link } from '@inertiajs/react';
import { Svg } from '@/Components/ui/svg/Svg';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Button } from '@/Components/ui/button/button';
import ApplicationLogo from '@/Components/logos/ApplicationLogo';
import ApplicationLogoDark from '@/Components/logos/ApplicationLogoDark';
import { useWindowSize, useEventListener, useLocalStorage } from 'usehooks-ts';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTrigger,
} from '../ui/sheet/sheet';
import { useTranslation } from 'react-i18next';

interface SideBarProps {
    children: ReactNode;
}

export default function SideBar({ children }: SideBarProps): JSX.Element {
    const { t } = useTranslation();
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
        <Sheet open={open} modal={isModal}>
            <SheetTrigger
                asChild
                className={clsx(
                    'fixed left-4 top-4 z-50 hidden',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                    { 'sm:flex': !open },
                )}
                onClick={() => setOpen(true)}
            >
                <Button variant={'outline'} size={'icon'}>
                    <Svg variant={'sideBar'} type={'hamburger'} />
                </Button>
            </SheetTrigger>
            <SheetContent onEscapeKeyDown={handleClose} onPointerDownOutside={handleClose}>
                <SheetHeader>
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
                </SheetHeader>
                {children}
                <SheetFooter>
                    <SheetClose
                        onClick={() => setOpen(false)}
                        className='absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none 2xl:hidden'
                    >
                        <Button variant={'outline'} size={'sm_icon'}>
                            <Cross2Icon className='h-4 w-4' />
                            <span className='sr-only'>{t('Close')}</span>
                        </Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
