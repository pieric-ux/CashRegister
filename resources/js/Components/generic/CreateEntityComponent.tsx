import { useTranslation } from 'react-i18next';
import { Button } from '@/Components/ui/button/button';
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

interface Datas {
    cardTitle: string;
    cardDescription: string;
    buttonAriaLabel: string;
    dialogTitle: string;
    dialogDescription: string;
}

export default function CreateEntityComponent({
    datas,
    open,
    setOpen,
    children,
}: {
    datas: Datas;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    children: ReactNode;
}): JSX.Element {
    const { t } = useTranslation();

    const { cardTitle, cardDescription, buttonAriaLabel, dialogTitle, dialogDescription } = datas;

    return (
        <section>
            <Card>
                <CardHeader size={'xl'}>
                    <CardTitle>{t(cardTitle)}</CardTitle>
                    <CardDescription>{t(cardDescription)}</CardDescription>
                </CardHeader>
                <CardFooter size={'xl'}>
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
                </CardFooter>
            </Card>
        </section>
    );
}
