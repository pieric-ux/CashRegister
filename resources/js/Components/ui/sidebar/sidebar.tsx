'use client';

import { Close, Portal, Root, Trigger } from '@radix-ui/react-dialog';
import { SidebarOverlay } from './sidebarOverlay';
import { SidebarContent } from './sidebarContent';
import { SidebarHeader } from './sidebarHeader';
import { SidebarFooter } from './sidebarFooter';
import { SidebarTitle } from './sidebarTitle';
import { SidebarDescription } from './sidebarDescription';

const Sidebar = Root;

const SidebarClose = Close;

const SidebarTrigger = Trigger;

const SidebarPortal = Portal;

export {
    Sidebar,
    SidebarPortal,
    SidebarOverlay,
    SidebarTrigger,
    SidebarClose,
    SidebarContent,
    SidebarHeader,
    SidebarFooter,
    SidebarTitle,
    SidebarDescription,
};
