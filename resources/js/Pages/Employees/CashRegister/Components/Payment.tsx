import axios from 'axios';
import { emptyCart } from '../Index';
import { useWindowSize } from 'usehooks-ts';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/Components/ui/button/button';
import { CashRegisterContext } from '@/Context/CashRegisterContext';
import { type PaymentMethod } from '@/Shared/Types/PaymentMethodsTypes';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTrigger,
} from '@/Components/ui/dialog/dialog';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTrigger,
} from '@/Components/ui/drawer/drawer';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar/avatar';

interface PaymentProps {
    paymentMethods: PaymentMethod[];
    isCartEmpty: boolean;
}

export default function Payment({ paymentMethods, isCartEmpty }: PaymentProps): JSX.Element {
    const { t } = useTranslation();
    const { width } = useWindowSize();

    const { cart, setCart } = useContext(CashRegisterContext);

    const [open, setOpen] = useState(false);

    const closeDialog = (): void => {
        setOpen(false);
    };

    const handlePayment = async (selectedPaymentMethod: PaymentMethod): Promise<void> => {
        const filteredCart = cart.items.filter((item) => item.id !== null);

        await axios
            .post(route('cashregister.store'), {
                cart: filteredCart,
                paymentMethod: selectedPaymentMethod,
            })
            .then(() => {
                closeDialog();
                setCart(emptyCart);
            });
    };

    return (
        <>
            {width < 640 ? (
                <Drawer open={open} onOpenChange={setOpen}>
                    <DrawerTrigger asChild>
                        <Button variant={'ring'} disabled={isCartEmpty}>
                            {t('Pay')}
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader className='grid-cols-3 justify-items-center'>
                            {paymentMethods.map((paymentMethod) => {
                                return (
                                    <Button
                                        className='flex-col gap-2'
                                        size={'touch'}
                                        key={paymentMethod.id}
                                        onClick={() => handlePayment(paymentMethod.id)}
                                    >
                                        <Avatar variant={'square'}>
                                            <AvatarImage
                                                src={paymentMethod.picture_url}
                                                alt={paymentMethod.name}
                                            />
                                        </Avatar>
                                        <p>{t(`${paymentMethod.name}`)}</p>
                                    </Button>
                                );
                            })}
                        </DrawerHeader>
                        <DrawerFooter>
                            <DrawerClose asChild>
                                <Button
                                    variant={'secondary'}
                                    onClick={() => {
                                        closeDialog();
                                    }}
                                >
                                    {t('Cancel')}
                                </Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            ) : (
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button variant={'ring'} disabled={isCartEmpty}>
                            {t('Pay')}
                        </Button>
                    </DialogTrigger>
                    <DialogContent size={'2xl'}>
                        <DialogHeader variant={'flex-row'} className='items-center justify-around'>
                            {paymentMethods.map((paymentMethod) => {
                                return (
                                    <Button
                                        size={'touch'}
                                        key={paymentMethod.id}
                                        onClick={() => handlePayment(paymentMethod.id)}
                                    >
                                        {paymentMethod.picture_url ? (
                                            <div>
                                                <img
                                                    className='mx-auto'
                                                    src={paymentMethod.picture_url}
                                                    alt={paymentMethod.name}
                                                    width={50}
                                                    height={50}
                                                />
                                                <p>{t(`${paymentMethod.name}`)}</p>
                                            </div>
                                        ) : (
                                            <p>{t(`${paymentMethod.name}`)}</p>
                                        )}
                                    </Button>
                                );
                            })}
                        </DialogHeader>

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button
                                    variant={'secondary'}
                                    onClick={() => {
                                        closeDialog();
                                    }}
                                >
                                    {t('Cancel')}
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
}
