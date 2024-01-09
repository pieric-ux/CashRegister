'use client';

import { DialogTitle } from '@/Components/ui/dialog/dialogTitle';
import { DialogHeader } from '@/Components/ui/dialog/dialogHeader';
import { DialogFooter } from '@/Components/ui/dialog/dialogFooter';
import { DialogContent } from '@/Components/ui/dialog/dialogContent';
import { DialogOverlay } from '@/Components/ui/dialog/dialogOverlay';
import { Root, Trigger, Portal, Close } from '@radix-ui/react-dialog';
import { DialogDescription } from '@/Components/ui/dialog/dialogDescription';

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
