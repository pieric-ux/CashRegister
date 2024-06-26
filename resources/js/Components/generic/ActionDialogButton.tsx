import { useWindowSize } from 'usehooks-ts';
import { Svg } from '@/Components/ui/svg/Svg';
import { useTranslation } from 'react-i18next';
import { Button } from '@/Components/ui/button/button';
import { ScrollArea } from '../ui/scrollarea/scrollArea';
import { type ReactNode, type Dispatch, type SetStateAction } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/ui/dialog/dialog';
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/Components/ui/drawer/drawer';

interface Datas {
    buttonAriaLabel: string;
    dialogTitle: string;
    dialogDescription: string;
}

interface ActionDialogButtonProps {
    datas: Datas;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    isUpdate?: boolean;
    disabled?: boolean;
    children: ReactNode;
}

export default function ActionDialogButton({
    datas,
    open,
    setOpen,
    isUpdate = false,
    disabled = false,
    children,
}: ActionDialogButtonProps): JSX.Element {
    const { t } = useTranslation();
    const { width } = useWindowSize();
    const isMobile = width < 640;

    const { buttonAriaLabel, dialogTitle, dialogDescription } = datas;

    return (
        <section>
            {isMobile ? (
                <Drawer open={open} onOpenChange={setOpen}>
                    <DrawerTrigger asChild>
                        {isUpdate ? (
                            <Button size={'icon'} aria-label={t(buttonAriaLabel)}>
                                <Svg type={'edit'} />
                            </Button>
                        ) : (
                            <Button
                                variant={'destructive'}
                                size={'icon'}
                                aria-label={t(buttonAriaLabel)}
                                disabled={disabled}
                            >
                                <Svg type={'delete'} variant={'destructive'} />
                            </Button>
                        )}
                    </DrawerTrigger>

                    <DrawerContent>
                        <ScrollArea>
                            <DrawerHeader>
                                <DrawerTitle>{t(dialogTitle)}</DrawerTitle>
                                <DrawerDescription>{t(dialogDescription)}</DrawerDescription>
                            </DrawerHeader>
                            {children}
                        </ScrollArea>
                    </DrawerContent>
                </Drawer>
            ) : (
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        {isUpdate ? (
                            <Button size={'icon'} aria-label={t(buttonAriaLabel)}>
                                <Svg type={'edit'} />
                            </Button>
                        ) : (
                            <Button
                                variant={'destructive'}
                                size={'icon'}
                                aria-label={t(buttonAriaLabel)}
                                disabled={disabled}
                            >
                                <Svg type={'delete'} variant={'destructive'} />
                            </Button>
                        )}
                    </DialogTrigger>
                    <DialogContent size={'2xl'}>
                        <DialogHeader>
                            <DialogTitle>{t(dialogTitle)}</DialogTitle>
                            <DialogDescription>{t(dialogDescription)}</DialogDescription>
                        </DialogHeader>
                        {children}
                    </DialogContent>
                </Dialog>
            )}
        </section>
    );
}
