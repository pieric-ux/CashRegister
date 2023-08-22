import EmployeeLayout from "@/Layouts/EmployeeLayout";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Cart from '@/Pages/Employees/CashRegister/Partials/Cart';
import Total from '@/Pages/Employees/CashRegister/Partials/Total';
import Payment from '@/Pages/Employees/CashRegister/Partials/Payment';
import Buttons from '@/Pages/Employees/CashRegister/Partials/Buttons';
import Items from './Partials/Items';
import { useTranslation } from "react-i18next";

export default function CashRegister({ employeeAuth, localization, categories, dishes, products, paymentMethods }) {
    const { t } = useTranslation();
    const emptyCartItem = { id: null, name: "", quantity: 0, client_price: 0 };
    const [cart, setCart] = useState(Array(5).fill(emptyCartItem));
    const isCartEmpty = cart.every(item => item.id === null || item.quantity === 0);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const [total, setTotal] = useState(0);
    const [isCartVisible, setIsCartVisible] = useState(true);
    const [serverErrors, setServerErrors] = useState({});

    useEffect(() => {
        if (selectedPaymentMethod) {
            handlePayment();
        }
    }, [selectedPaymentMethod])

    useEffect(() => {
        const newTotal = calculateTotal();
        setTotal(newTotal);
    }, [cart]);

    const removeFromCart = (index) => {
        const newCart = [...cart];
        newCart.splice(index, 1);
        newCart.push({
            id: null,
            name: "",
            quantity: 0,
            client_price: 0
        })
        setCart(newCart);
    }

    const calculateTotal = () => {
        return cart.reduce((subtotal, item) => {
            return subtotal + (item.quantity * item.client_price);
        }, 0);
    }

    const handlePayment = async () => {
        const filteredCart = cart.filter(item => item.id !== null);

        await axios.post(route('cashregister.store'), {
            cart: filteredCart,
            paymentMethod: selectedPaymentMethod
        })
            .then(response => {
                setCart(Array(5).fill(emptyCartItem));
                setSelectedPaymentMethod(null);
                setServerErrors({});
            })
            .catch(error => {
                if (error.response && error.response.data && error.response.data.errors) {
                    setServerErrors(error.response.data.errors);
                }
            });
    }

    return (
        <EmployeeLayout auth={employeeAuth} localization={localization}>
            <Head title={t(`${employeeAuth.employee.cr_workstations.name}`)} />
            {serverErrors && Object.keys(serverErrors).length > 0 && (
                <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 mb-4 bg-red-100 border border-red-400 text-red-700 py-3 rounded relative" role="alert">
                    <strong className="font-bold">{t('Errors')}</strong>
                    <ul className="mt-2">
                        {Object.values(serverErrors).map((error, index) => (
                            <li key={index} className="ml-4">{error[0]}</li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 space-y-6">
                <div className="flex flex-col p-4 sm:p-8 bg-white dark:bg-gray-800 shadow-md rounded-lg transition ease-linear duration-300">
                    <Cart isCartVisible={isCartVisible} cart={cart} removeFromCart={removeFromCart} />
                    <Total total={total} />
                    <Payment paymentMethods={paymentMethods} isCartEmpty={isCartEmpty} setSelectedPaymentMethod={setSelectedPaymentMethod} />
                    <Buttons isCartVisible={isCartVisible} setIsCartVisible={setIsCartVisible} />
                    <Items isCartVisible={isCartVisible} cart={cart} setCart={setCart} categories={categories} dishes={dishes} products={products} />
                </div>
            </div>
        </EmployeeLayout >
    );
}
