import { Swiper, SwiperSlide } from 'swiper/react';
import DangerButton from "@/Components/DangerButton";
import PrimaryButton from "@/Components/PrimaryButton";
import EmployeeLayout from "@/Layouts/EmployeeLayout";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pagination } from 'swiper/modules';

import 'swiper/css/bundle';
import SecondaryButton from '@/Components/SecondaryButton';

export default function CashRegister({ employeeAuth, localization, categories, dishes, products }) {

    const { t } = useTranslation();
    const emptyCartItem = { id: null, name: "", quantity: 0, client_price: 0 };
    const [cart, setCart] = useState(Array(5).fill(emptyCartItem));
    const [total, setTotal] = useState(0);
    const [isCartVisible, setIsCartVisible] = useState(true);
    const [activeSection, setActiveSection] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    const soldSeparatelydDishesMap = new Map(dishes.filter(dish => dish.is_SoldSeparately).map(dish => [dish.id, dish]));
    const productsDishesMap = products.reduce((dishes, product) => {
        if (product.cr_dishes && product.cr_dishes.name !== 'No dish') {
            dishes.set(product.cr_dishes.id, product.cr_dishes);
        }
        return dishes;
    }, new Map());
    const returnDishesMap = new Map([...soldSeparatelydDishesMap, ...productsDishesMap]);

    const toggleSection = (section) => {
        activeSection === section ? setActiveSection(null) : setActiveSection(section);
    }

    useEffect(() => {
        if (productsDishesMap.size > 0) {
            setActiveSection('return');
        } else if (categories && categories.length > 0) {
            setActiveSection(categories[0].id);
        }
    }, [categories]);

    const settings = {
        modules: [Pagination],
        onTransitionStart: () => setIsDragging(true),
        onTransitionEnd: () => setIsDragging(false),
        preventClicks: isDragging,
        preventClicksPropagation: isDragging,
        pagination: {
            el: '.swiper-pagination',
            type: 'progressbar',
            renderProgressbar: function (progressbarFillClass) {
                return '<span class="' + progressbarFillClass + ' !bg-sky-500"></span>';
            }
        },

        breakpoints: {
            320: {
                slidesPerView: 2,
            },
            375: {
                slidesPerView: 3,
            },
            640: {
                slidesPerView: 4,

            },
            768: {
                slidesPerView: 5,

            },
            1024: {
                slidesPerView: 6,

            },
            1280: {
                slidesPerView: 8,

            }
        }
    };

    const addToCart = (item, itemType) => {
        let newCart = [...cart];
        let price = itemType === 'return' ? -1 * item.client_price : item.client_price;

        if (item.cr_dishes && item.cr_dishes.is_consigned) {
            price += item.cr_dishes.client_price;
        }

        let foundItem = newCart.find(cartItem => cartItem.id === item.id && cartItem.type === itemType);

        if (foundItem) {
            foundItem.quantity += 1;
        } else {
            const emptyIndex = newCart.findIndex(cartItem => cartItem.id === null);
            if (emptyIndex !== -1) {
                newCart[emptyIndex] = { ...item, quantity: 1, client_price: price, type: itemType };
            } else {
                newCart.push({ ...item, quantity: 1, client_price: price, type: itemType });
            }
        }
        setCart(newCart);
        console.log(newCart);
    };

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

    useEffect(() => {
        const newTotal = calculateTotal();
        setTotal(newTotal);
    }, [cart]);

    return (
        <EmployeeLayout auth={employeeAuth} localization={localization}>
            <Head title={employeeAuth.employee.cr_workstations.name} />
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 space-y-6">
                <div className="flex flex-col p-4 sm:p-8 bg-white dark:bg-gray-800 shadow-md rounded-lg transition ease-linear duration-300">
                    {/* Cart */}
                    <div className={`${isCartVisible ? 'block' : 'hidden sm:block'} sm:max-h-[229px] border border-gray-300 dark:border-gray-700 rounded-lg overflow-x-hidden`}>
                        <table className="min-w-full text-gray-900 dark:text-gray-100 divide-y divide-gray-300 dark:divide-gray-700 transition ease-linear duration-300">
                            <thead>
                                <tr className="sticky top-0 bg-white dark:bg-gray-900 divide-x divide-gray-300 dark:divide-gray-700">
                                    <th className="w-1/12 p-2 text-center text-xs font-medium uppercase tracking-wider">{t('QTY')}</th>
                                    <th className="py-2 text-center text-xs font-medium uppercase tracking-wider">{t('Product')}</th>
                                    <th className="w-3/12 py-2 pr-2 text-right text-xs font-medium uppercase tracking-wider">{t('Price')}</th>
                                    <th className="hidden sm:table-cell w-3/12 py-2 pr-2 text-right text-xs font-medium uppercase tracking-wider">{t('Sub-Total')}</th>
                                    <th className="w-1/12 text-center text-xs font-medium uppercase tracking-wider">#</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-300 dark:divide-gray-700">
                                {cart.map((item, index) => (
                                    <tr key={index} className="divide-x divide-gray-300 dark:divide-gray-700 even:bg-gray-200/25 even:dark:bg-gray-800/25 odd:bg-gray-400/25 odd:dark:bg-gray-600">
                                        <td className="p-1 text-center text-sm">{item.quantity}</td>
                                        <td className="p-1 pl-2 text-left text-sm">{item.name} {item.unit}</td>
                                        <td className="p-1 pr-2 text-right text-sm">{`${item.client_price} ${t('currency_symbol')}`}</td>
                                        <td className="hidden sm:table-cell p-1 pr-2 text-right text-sm">{`${item.quantity * item.client_price} ${t('currency_symbol')}`}</td>
                                        <td className="p-1 text-center">
                                            <DangerButton className='!px-2' onClick={() => removeFromCart(index)}>
                                                <svg className='w-3 h-3 text-white' fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 430.901 583.409">
                                                    <g>
                                                        <path d="M3.339,199.409h384v320c0,35.3-28.7,64-64,64h-256c-35.3,0-64-28.7-64-64V199.409z M99.339,263.409c-8.8,0-16,7.2-16,16
		                                                    v224c0,8.8,7.2,16,16,16s16-7.2,16-16v-224C115.339,270.609,108.139,263.409,99.339,263.409z M195.339,263.409c-8.8,0-16,7.2-16,16
                                                            v224c0,8.8,7.2,16,16,16s16-7.2,16-16v-224C211.339,270.609,204.139,263.409,195.339,263.409z M291.339,263.409
                                                            c-8.8,0-16,7.2-16,16v224c0,8.8,7.2,16,16,16s16-7.2,16-16v-224C307.339,270.609,300.139,263.409,291.339,263.409z"/>
                                                        <path d="M148.166,27.847c8.802-8.396,21.559-10.989,32.929-6.851l113.139,41.179c11.37,4.138,19.475,14.325,20.821,26.414
                                                            l1.875,15.9l90.21,32.834c16.633,6.054,25.179,24.382,19.126,41.015c-6.054,16.633-24.382,25.179-41.015,19.126L24.41,66.129
                                                            C7.777,60.075-0.769,41.746,5.284,25.114S29.667-0.065,46.299,5.988l90.21,32.834L148.166,27.847z"/>
                                                    </g>
                                                </svg>
                                            </DangerButton>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Total */}
                    <div className="self-end flex items-center justify-center mt-6 p-4 sm:p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg transition ease-linear duration-300">
                        <span className="font-medium sm:text-2xl text-xl mr-2">{t('Total')}:</span>
                        <span className="font-bold sm:text-2xl text-xl">{total} {t('currency_symbol')}</span>
                    </div>
                    {/* Buttons */}
                    <PrimaryButton className="w-full mt-4 items-center justify-center bg-sky-500 dark:bg-sky-500 dark:text-white !text-base">
                        Payer
                    </PrimaryButton>
                    <div className='mt-4'>
                        <SecondaryButton className='sm:hidden' onClick={() => { setIsCartVisible(!isCartVisible) }}>
                            {isCartVisible ? 'Produits' : 'Panier'}
                        </SecondaryButton>
                    </div>
                    {/* List of Products and Dishes */}
                    <div className={`${isCartVisible ? 'hidden sm:block' : 'block'}`}>
                        {/* Return Dishes */}
                        {returnDishesMap.size > 0 && (
                            <div className={`${activeSection === 'return' ? 'p-4 sm:p-8 !pt-0' : 'p-0'} flex flex-col justify-center gap-2 mt-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg transition ease-linear duration-300 cursor-pointer`}>
                                <h3 className={`${activeSection === 'return' ? 'pt-4 sm:pt-8 !pb-0' : 'p-4 sm:p-8'}`} onClick={() => toggleSection('return')}>{t('Return Dishes')}</h3>
                                {activeSection === 'return' && (
                                    <div>
                                        <Swiper {...settings}>
                                            {[...returnDishesMap.values()].map(dish => (
                                                <SwiperSlide key={dish.id} className='pt-4'>
                                                    <button
                                                        onClick={() => {
                                                            if (!isDragging) {
                                                                addToCart(dish, 'return')
                                                            }
                                                        }}
                                                        className="w-[82px] h-[82px] flex flex-col items-center justify-center mx-auto p-4 rounded-lg bg-white dark:bg-gray-800 transition ease-linear duration-300 disabled:opacity-25 disabled:cursor-not-allowed"
                                                        disabled={isDragging}
                                                    >
                                                        {dish.picture_url ? (
                                                            <>
                                                                <img className="mx-auto" src={dish.picture_url} alt={dish.name} width={50} height={50} />
                                                                <p>{dish.unit}</p>
                                                            </>
                                                        )
                                                            : <p>{`${dish.name} ${dish.unit}`}</p>
                                                        }
                                                    </button>
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </div>
                                )}
                            </div>
                        )}
                        {/* Products */}
                        {categories && categories.filter(category => {
                            const filteredProducts = products.filter(p => p.cr_categories_products.id === category.id);
                            return filteredProducts.length > 0;
                        }).map(category => {
                            const filteredProducts = products.filter(p => p.cr_categories_products.id === category.id);
                            return (
                                <div key={category.id} className={`${activeSection === category.id ? 'p-4 sm:p-8 !pt-0' : 'p-0'} flex flex-col gap-2 mt-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg transition ease-linear duration-300 cursor-pointer`}>
                                    <h3 className={`${activeSection === category.id ? 'pt-4 sm:pt-8 !pb-0' : 'p-4 sm:p-8'}`} onClick={() => toggleSection(category.id)}>
                                        {t(category.name)}
                                    </h3>
                                    {activeSection === category.id && (
                                        <div>
                                            <Swiper {...settings}>
                                                {filteredProducts.map(product => (
                                                    <SwiperSlide key={product.id} className='pt-4'>
                                                        <button
                                                            onClick={() => {
                                                                if (!isDragging) {
                                                                    addToCart(product, 'product')
                                                                }
                                                            }}
                                                            className="w-[82px] h-[82px] flex flex-col items-center justify-center mx-auto p-4 rounded-lg bg-white dark:bg-gray-800 transition ease-linear duration-300 disabled:opacity-25 disabled:cursor-not-allowed"
                                                            disabled={isDragging}
                                                        >
                                                            {product.picture_url ? (
                                                                <>
                                                                    <img className="mx-auto" src={product.picture_url} alt={product.name} width={50} height={50} />
                                                                    <p>{product.unit}</p>
                                                                </>
                                                            )
                                                                : <p>{`${product.name} ${product.unit}`}</p>
                                                            }
                                                        </button>
                                                    </SwiperSlide>
                                                ))}
                                                <div className="swiper-pagination swiper-pagination-progressbar swiper-pagination-horizontal">
                                                    {/*renderProgressbar*/}
                                                </div>
                                            </Swiper>
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                        {/* Dishes */}
                        {soldSeparatelydDishesMap.size > 0 && (
                            <div className={`${activeSection === 'dishes' ? 'p-4 sm:p-8 !pt-0' : 'p-0'} flex flex-col justify-center gap-2 mt-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg transition ease-linear duration-300 cursor-pointer`}>
                                <h3 className={`${activeSection === 'dishes' ? 'pt-4 sm:pt-8 !pb-0' : 'p-4 sm:p-8'}`} onClick={() => toggleSection('dishes')}>{t('Dishes')}</h3>
                                {activeSection === 'dishes' && (
                                    <div>
                                        <Swiper {...settings}>
                                            {[...soldSeparatelydDishesMap.values()].map(dish => (
                                                <SwiperSlide key={dish.id} className='pt-4'>
                                                    <button
                                                        onClick={() => {
                                                            if (!isDragging) {
                                                                addToCart(dish, 'dishes')
                                                            }
                                                        }}
                                                        className="w-[82px] h-[82px] flex flex-col items-center justify-center mx-auto p-4 rounded-lg bg-white dark:bg-gray-800 transition ease-linear duration-300 disabled:opacity-25 disabled:cursor-not-allowed"
                                                        disabled={isDragging}
                                                    >
                                                        {dish.picture_url ? (
                                                            <>
                                                                <img className="mx-auto" src={dish.picture_url} alt={dish.name} width={50} height={50} />
                                                                <p>{dish.unit}</p>
                                                            </>
                                                        )
                                                            : <p>{`${dish.name} ${dish.unit}`}</p>
                                                        }
                                                    </button>
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </EmployeeLayout >
    );
}

