import { useState } from 'react';
import { useWindowSize } from 'usehooks-ts';
import { useTranslation } from 'react-i18next';
import { Button } from '@/Components/ui/button/button';
import { deleteCustomerDatas } from '@/Shared/Datas/deleteCustomerDatas';
import ConfirmDeleteForm from '@/Components/forms/Auth/ConfirmDeleteForm';
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

export default function DeleteUser(): JSX.Element {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const { width } = useWindowSize();
    const isMobile = width < 640;

    const closeDialog = (): void => {
        setOpen(false);
    };

    return (
        <section>
            <Card>
                <CardHeader size={'xl'}>
                    <CardTitle>{t(deleteCustomerDatas.buttonTitle)}</CardTitle>
                    <CardDescription>{t(deleteCustomerDatas.cardDescription)}</CardDescription>
                </CardHeader>
                <CardFooter size={'xl'}>
                    {isMobile ? (
                        <Drawer open={open} onOpenChange={setOpen}>
                            <DrawerTrigger asChild>
                                <Button
                                    variant={'destructive'}
                                    aria-label={t(deleteCustomerDatas.buttonAriaLabel)}
                                >
                                    {t(deleteCustomerDatas.buttonTitle)}
                                </Button>
                            </DrawerTrigger>
                            <DrawerContent>
                                <DrawerHeader>
                                    <DrawerTitle>{t(deleteCustomerDatas.dialogTitle)}</DrawerTitle>
                                    <DrawerDescription>
                                        {t(deleteCustomerDatas.dialogDescription)}
                                    </DrawerDescription>
                                </DrawerHeader>
                                <ConfirmDeleteForm
                                    datas={deleteCustomerDatas}
                                    closeDialog={closeDialog}
                                    route={route('profile.destroy')}
                                />
                            </DrawerContent>
                        </Drawer>
                    ) : (
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                                <Button
                                    variant={'destructive'}
                                    aria-label={t(deleteCustomerDatas.buttonAriaLabel)}
                                >
                                    {t(deleteCustomerDatas.buttonTitle)}
                                </Button>
                            </DialogTrigger>
                            <DialogContent size={'2xl'}>
                                <DialogHeader>
                                    <DialogTitle>{t(deleteCustomerDatas.dialogTitle)}</DialogTitle>
                                    <DialogDescription>
                                        {t(deleteCustomerDatas.dialogDescription)}
                                    </DialogDescription>
                                </DialogHeader>
                                <ConfirmDeleteForm
                                    datas={deleteCustomerDatas}
                                    closeDialog={closeDialog}
                                    route={route('profile.destroy')}
                                />
                            </DialogContent>
                        </Dialog>
                    )}
                </CardFooter>
            </Card>
        </section>
    );
}
