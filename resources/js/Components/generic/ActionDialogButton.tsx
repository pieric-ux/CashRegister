import { Svg } from '@/Components/ui/svg/Svg';
import { useTranslation } from 'react-i18next';
import { Button } from '@/Components/ui/button/button';
import { type ReactNode, type Dispatch, type SetStateAction } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/ui/dialog/dialog';

interface Datas {
    buttonAriaLabel: string;
    dialogTitle: string;
    dialogDescription: string;
}

export default function UpdateDeleteEntityComponent({
    datas,
    open,
    setOpen,
    isUpdate,
    children,
}: {
    datas: Datas;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    isUpdate?: boolean;
    children: ReactNode;
}): JSX.Element {
    const { t } = useTranslation();

    const { buttonAriaLabel, dialogTitle, dialogDescription } = datas;

    return (
        <section>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    {isUpdate !== null && isUpdate !== undefined ? (
                        <Button size={'icon'} aria-label={t(buttonAriaLabel)}>
                            <Svg type={'edit'} />
                        </Button>
                    ) : (
                        <Button
                            variant={'destructive'}
                            size={'icon'}
                            aria-label={t(buttonAriaLabel)}
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
        </section>
    );
}
