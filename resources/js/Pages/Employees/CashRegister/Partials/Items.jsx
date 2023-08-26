import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { useTranslation } from "react-i18next";
import 'swiper/css/pagination';

export default function Items({ isCartVisible, cart, setCart, categories, dishes, products }) {
    const { t } = useTranslation();
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

    useEffect(() => {
        if (productsDishesMap.size > 0) {
            setActiveSection('return');
        } else if (categories && categories.length > 0) {
            setActiveSection(categories[0].id);
        }
    }, [categories]);

    const toggleSection = (section) => {
        activeSection === section ? setActiveSection(null) : setActiveSection(section);
    }

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
        let price = parseFloat(item.client_price);

        if (itemType === 'return') {
            price *= -1;
        }

        if (item.cr_dishes && item.cr_dishes.is_consigned) {
            price += parseFloat(item.cr_dishes.client_price);
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
    };

    return (
        <div className={`${isCartVisible ? 'hidden sm:block' : 'block'}`}>
            {/* Return Dishes */}
            {returnDishesMap.size > 0 && (
                <div className={`${activeSection === 'return' ? 'p-4 sm:p-8 !pt-0' : 'p-0'} flex flex-col justify-center gap-2 mt-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg transition ease-linear duration-300 cursor-pointer`}>
                    <h3 className={`${activeSection === 'return' ? 'pt-4 sm:pt-8 !pb-0' : 'p-4 sm:p-8'}`} onClick={() => toggleSection('return')}>{t('Return Dishes')}</h3>
                    {activeSection === 'return' && (
                        <div>
                            <Swiper {...settings}>
                                {[...returnDishesMap.values()].map(dish => (
                                    <SwiperSlide key={dish.id} className="pt-4">
                                        <button
                                            onClick={() => {
                                                if (!isDragging) {
                                                    addToCart(dish, 'return')
                                                }
                                            }}
                                            className="w-[82px] h-[82px] flex flex-col items-center justify-center mx-auto m-2 p-4 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 focus:bg-gray-200 dark:focus:bg-gray-700 active:bg-gray-200 dark:active:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-linear duration-300 disabled:opacity-25 disabled:cursor-not-allowed"
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
                                        <SwiperSlide key={product.id} className="pt-4">
                                            <button
                                                onClick={() => {
                                                    if (!isDragging) {
                                                        addToCart(product, 'product')
                                                    }
                                                }}
                                                className="w-[82px] h-[82px] flex flex-col items-center justify-center mx-auto m-2 p-4 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 focus:bg-gray-200 dark:focus:bg-gray-700 active:bg-gray-200 dark:active:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-linear duration-300 disabled:opacity-25 disabled:cursor-not-allowed"
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
                                    <SwiperSlide key={dish.id} className="pt-4">
                                        <button
                                            onClick={() => {
                                                if (!isDragging) {
                                                    addToCart(dish, 'dishes')
                                                }
                                            }}
                                            className="w-[82px] h-[82px] flex flex-col items-center justify-center mx-auto m-2 p-4 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 focus:bg-gray-200 dark:focus:bg-gray-700 active:bg-gray-200 dark:active:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-linear duration-300 disabled:opacity-25 disabled:cursor-not-allowed"
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
            )
            }
        </div >
    );
}