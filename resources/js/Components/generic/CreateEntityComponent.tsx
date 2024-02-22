import { useWindowSize } from 'usehooks-ts';
import { useTranslation } from 'react-i18next';
import { Button } from '@/Components/ui/button/button';
import { ScrollArea } from '../ui/scrollarea/scrollArea';
import { type Dispatch, type SetStateAction, type ReactNode } from 'react';
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card/card';
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
    cardTitle: string;
    cardDescription: string;
    buttonAriaLabel: string;
    dialogTitle: string;
    dialogDescription: string;
}

interface CreateEntityComponentProps {
    datas: Datas;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    children: ReactNode;
}

export default function CreateEntityComponent({
    datas,
    open,
    setOpen,
    children,
}: CreateEntityComponentProps): JSX.Element {
    const { t } = useTranslation();
    const { width } = useWindowSize();
    const isMobile = width < 640;

    const { cardTitle, cardDescription, buttonAriaLabel, dialogTitle, dialogDescription } = datas;

    return (
        <section>
            <Card>
                <CardHeader size={'xl'}>
                    <CardTitle>{t(cardTitle)}</CardTitle>
                    <CardDescription>{t(cardDescription)}</CardDescription>
                </CardHeader>
                <CardFooter size={'xl'}>
                    {isMobile ? (
                        <Drawer open={open} onOpenChange={setOpen}>
                            <DrawerTrigger asChild>
                                <Button aria-label={t(buttonAriaLabel)}>{t('Create')}</Button>
                            </DrawerTrigger>
                            <DrawerContent>
                                <ScrollArea>
                                    <DrawerHeader>
                                        <DrawerTitle>{t(dialogTitle)}</DrawerTitle>
                                        <DrawerDescription>
                                            {t(dialogDescription)}
                                        </DrawerDescription>
                                    </DrawerHeader>
                                    {children}
                                </ScrollArea>
                            </DrawerContent>
                        </Drawer>
                    ) : (
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                                <Button aria-label={t(buttonAriaLabel)}>{t('Create')}</Button>
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
                </CardFooter>
            </Card>
        </section>
    );
}
