import axios from 'axios';
import { useWindowSize } from 'usehooks-ts';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { type Dish } from '@/Shared/Types/DishTypes';
import { Button } from '@/Components/ui/button/button';
import { type Product } from '@/Shared/Types/ProductTypes';
import { type Employee } from '@/Shared/Types/EmployeeTypes';
import { type Workstation } from '@/Shared/Types/WorkstationTypes';
import { CashRegisterContext } from '@/Context/CashRegisterContext';
import { Avatar, AvatarImage } from '@/Components/ui/avatar/avatar';
import { type CashRegister } from '@/Shared/Types/CashRegisterTypes';
import { type PaymentMethod } from '@/Shared/Types/PaymentMethodsTypes';
import { type CategoryProducts } from '@/Shared/Types/CategoryProductsTypes';
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
import { usePage } from '@inertiajs/react';

interface PageProps extends InertiaPageProps {
    employee: Employee & {
        cr_workstations: Workstation & {
            cr_modules: CashRegister & {
                cr_dishes: Dish[];
                cr_payment_methods: PaymentMethod[];
            };
            cr_products: Product &
                {
                    cr_categories_products: CategoryProducts;
                    cr_dishes: Dish;
                }[];
        };
    };
}

interface PaymentProps {
    isCartEmpty: boolean;
}

export default function Payment({ isCartEmpty }: PaymentProps): JSX.Element {
    const emptyCartItem = { id: null, name: '', quantity: 0, client_price: 0 };
    const emptyCart = { items: Array(5).fill(emptyCartItem), total: 0 };

    const { t } = useTranslation();
    const { width } = useWindowSize();
    const { employee } = usePage<PageProps>().props;

    const paymentMethods = employee.cr_workstations.cr_modules.cr_payment_methods;

    const { cart, setCart } = useContext(CashRegisterContext);

    const [open, setOpen] = useState(false);

    const closeDialog = (): void => {
        setOpen(false);
    };

    const handlePayment = (selectedPaymentMethod: PaymentMethod): void => {
        const filteredCart = cart.items.filter((item) => item.id !== null);

        axios
            .post(route('cashregister.store'), {
                cart: filteredCart,
                paymentMethod: selectedPaymentMethod.id,
            })
            .then(() => {
                closeDialog();
                setCart(emptyCart);
            })
            .catch((error) => {
                console.error(error); // TODO: Alert dialog with message
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
                                        onClick={() => handlePayment(paymentMethod)}
                                    >
                                        <Avatar variant={'square'}>
                                            <AvatarImage
                                                src={paymentMethod.media[0].original_url}
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
                                        onClick={() => handlePayment(paymentMethod)}
                                    >
                                        <Avatar variant={'square'}>
                                            <AvatarImage
                                                src={paymentMethod.media[0].original_url}
                                                alt={paymentMethod.name}
                                            />
                                        </Avatar>
                                        <p>{t(`${paymentMethod.name}`)}</p>
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
