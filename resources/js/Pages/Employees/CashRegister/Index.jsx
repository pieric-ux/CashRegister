import EmployeeLayout from "@/Layouts/EmployeeLayout";
import Buttons from "@/Pages/Employees/CashRegister/Partials/Buttons";
import Cart from "@/Pages/Employees/CashRegister/Partials/Cart";
import Payment from "@/Pages/Employees/CashRegister/Partials/Payment";
import Total from "@/Pages/Employees/CashRegister/Partials/Total";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Items from "./Partials/Items";

// Flavien: tu pourrais déclarer la variable ici:
// const emptyCartItem = { id: null, name: "", quantity: 0, client_price: 0 };

export default function CashRegister({
    employeeAuth,
    localization,
    categories,
    dishes,
    products,
    paymentMethods,
}) {
    const { t } = useTranslation();

    {
        // Flavien: c'est un détail mais ce genre de variables peut être crée en dehors du composant.
        // L'avoir dans le composant fait que la variable est recréée à chaque fois que le composant est rendu.
        // C'est pas grave dans ce cas-ci mais c'est potentiellement une perte de performance.
        /* Initialize cart and related states */
    }
    const emptyCartItem = { id: null, name: "", quantity: 0, client_price: 0 };
    const [cart, setCart] = useState(Array(5).fill(emptyCartItem));
    const isCartEmpty = cart.every(
        (item) => item.id === null || item.quantity === 0,
    );

    // Flavien: je ne suis pas fan d'avoir plusieurs states comme ça. D'une certaine manière ils représentent la même chose.
    // Tout pourrait être dans un seul state qui stock un objet. Cela permet d'éviter de faire plusieurs setState à la suite.
    // Il y aurait le useReducer qui serait intéressant: https://www.youtube.com/watch?v=cDdGGthGA6M
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null); // Flavien: peut être supprimé si on appelle directement la méthode `handlePayment` avec le paymentMethod en paramètre.
    const [total, setTotal] = useState(0);
    const [isCartVisible, setIsCartVisible] = useState(true);
    const [serverErrors, setServerErrors] = useState({});

    {
        // Flavien: les useEffect font un peu débat car ils créent des side effects et un code qui n'est pas pure.
        // A la place d'avoir un useEffet il serait possible d'appeler la méthode `handlePayment` et de lui passer la méthode de paiement en parallèle.
        // Cela permet de supprmier le useEffet et de tester directement dans la méthode `handlePayment` si un moyen de paiement est sélectionné.
        /* Handle payment method selection */
    }
    useEffect(() => {
        if (selectedPaymentMethod) {
            handlePayment();
        }
    }, [selectedPaymentMethod]);

    {
        /* Update total when cart changes */
    }
    useEffect(() => {
        const newTotal = calculateTotal();
        setTotal(newTotal);
    }, [cart]);

    {
        /* Remove item from cart */
    }
    const removeFromCart = (index) => {
        const newCart = [...cart];
        newCart.splice(index, 1);
        // Flavien: je ne suis pas certain de comprendre pourquoi tu ajouter un objet null dans le `cart`
        newCart.push({
            id: null,
            name: "",
            quantity: 0,
            client_price: 0,
        });
        setCart(newCart);
    };

    {
        // Flavien: c'est OK de faire comme ça. Si le `cart` devient grand il serait possible d'utiliser un useCallback
        // Je ne pense pas que ce soit nécessaire dans ce cas-ci.
        /* Calculate total of items in cart */
    }
    const calculateTotal = () => {
        return cart.reduce((subtotal, item) => {
            return subtotal + item.quantity * item.client_price;
        }, 0);
    };

    {
        // Flavien: je changerais la signature de la méthode pour prendre un paramètre `paymentMethdo`.
        // Cela permet de supprimer le useEffet et de tester directement dans la méthode `handlePayment` si un moyen de paiement est sélectionné.
        /* Handle payment processing */
    }
    const handlePayment = async () => {
        const filteredCart = cart.filter((item) => item.id !== null);

        // Flavien: le code fonctionne bien comme ça, mais il serait possible de faire ça dans un try catch avec les updates des states après la réponse
        // Le code pourrait être fait de la sorte:
        // try {
        //     await axios.post(route("cashregister.store"), {
        //         cart: filteredCart,
        //         paymentMethod: selectedPaymentMethod,
        //     });
        //     setCart(Array(5).fill(emptyCartItem));
        //     setSelectedPaymentMethod(null);
        //     setServerErrors({});
        // } catch (error) {
        //     if (
        //         error.response &&
        //         error.response.data &&
        //         error.response.data.errors
        //     ) {
        //         setServerErrors(error.response.data.errors);
        //     }
        // }

        await axios
            .post(route("cashregister.store"), {
                cart: filteredCart,
                paymentMethod: selectedPaymentMethod,
            })
            // Flavien: le paramètre response est pas utilisé, il peut être supprimé
            .then((response) => {
                setCart(Array(5).fill(emptyCartItem));

                // Flavien: le state pourrait être supprimé
                setSelectedPaymentMethod(null);
                setServerErrors({});
            })
            .catch((error) => {
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.errors
                ) {
                    setServerErrors(error.response.data.errors);
                }
            });
    };

    return (
        <EmployeeLayout auth={employeeAuth} localization={localization}>
            <Head title={t(`${employeeAuth.employee.cr_workstations.name}`)} />
            {serverErrors && Object.keys(serverErrors).length > 0 && (
                <div
                    className="relative mx-auto mb-4 max-w-7xl rounded border border-red-400 bg-red-100 px-2 py-3 text-red-700 sm:px-6 lg:px-8"
                    role="alert"
                >
                    <strong className="font-bold">{t("Errors")}</strong>
                    <ul className="mt-2">
                        {Object.values(serverErrors).map((error, index) => (
                            <li key={index} className="ml-4">
                                {error[0]}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="mx-auto max-w-7xl space-y-6 px-2 sm:px-6 lg:px-8">
                <div className="flex flex-col rounded-lg bg-white p-4 shadow-md transition duration-300 ease-linear dark:bg-gray-800 sm:p-8">
                    <Cart
                        isCartVisible={isCartVisible}
                        cart={cart}
                        removeFromCart={removeFromCart}
                    />
                    <Total total={total} />
                    <Payment
                        paymentMethods={paymentMethods}
                        isCartEmpty={isCartEmpty}
                        // Flavien: au lieu de set un state j'apellerait la méthode `handlePayment` directement.
                        // Cela permet de supprimer un useEffect et un useState. Il suffit ensuite de tester directement dans la méthode `handlePayment` si un moyen de paiement est sélectionné.
                        setSelectedPaymentMethod={setSelectedPaymentMethod}
                    />
                    <Buttons
                        isCartVisible={isCartVisible}
                        setIsCartVisible={setIsCartVisible}
                    />
                    <Items
                        isCartVisible={isCartVisible}
                        cart={cart}
                        setCart={setCart}
                        categories={categories}
                        dishes={dishes}
                        products={products}
                    />
                </div>
            </div>
        </EmployeeLayout>
    );
}
