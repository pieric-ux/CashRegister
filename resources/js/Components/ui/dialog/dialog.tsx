'use client';

import { Root, Trigger, Portal, Close } from '@radix-ui/react-dialog';
import { DialogContent } from './dialogContent';
import { DialogHeader } from './dialogHeader';
import { DialogTitle } from './dialogTitle';
import { DialogDescription } from './dialogDescription';
import { DialogFooter } from './dialogFooter';
import { DialogOverlay } from './dialogOverlay';

const Dialog = Root;

const DialogClose = Close;

const DialogTrigger = Trigger;

const DialogPortal = Portal;

export {
    Dialog,
    DialogPortal,
    DialogOverlay,
    DialogTrigger,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
};
