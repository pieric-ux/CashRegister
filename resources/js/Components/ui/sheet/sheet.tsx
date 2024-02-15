'use client';

import { SheetTitle } from './sheetTitle';
import { SheetHeader } from './sheetHeader';
import { SheetFooter } from './sheetFooter';
import { SheetContent } from './sheetContent';
import { SheetOverlay } from './sheetOverlay';
import { SheetDescription } from './sheetDesciption';
import { Root, Trigger, Close, Portal } from '@radix-ui/react-dialog';

const Sheet = Root;

const SheetTrigger = Trigger;

const SheetClose = Close;

const SheetPortal = Portal;

export {
    Sheet,
    SheetPortal,
    SheetOverlay,
    SheetTrigger,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetFooter,
    SheetTitle,
    SheetDescription,
};
