'use client';

import { type ComponentProps } from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';
import { DrawerTitle } from '@/Components/ui/drawer/drawerTitle';
import { DrawerHeader } from '@/Components/ui/drawer/drawerHeader';
import { DrawerFooter } from '@/Components/ui/drawer/drawerFooter';
import { DrawerOverlay } from '@/Components/ui/drawer/drawerOverlay';
import { DrawerContent } from '@/Components/ui/drawer/drawerContent';
import { DrawerDescription } from '@/Components/ui/drawer/drawerDescription';

const Drawer = ({
    shouldScaleBackground = true,
    ...props
}: ComponentProps<typeof DrawerPrimitive.Root>): JSX.Element => (
    <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} {...props} />
);
Drawer.displayName = 'Drawer';

const DrawerTrigger = DrawerPrimitive.Trigger;

const DrawerPortal = DrawerPrimitive.Portal;

const DrawerClose = DrawerPrimitive.Close;

export {
    Drawer,
    DrawerPortal,
    DrawerOverlay,
    DrawerTrigger,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerFooter,
    DrawerTitle,
    DrawerDescription,
};
