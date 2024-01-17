// TODO: Refactor
import clsx from 'clsx';
import 'swiper/css/bundle';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { swiperSetting } from '@/Config/swiperConfig';

export default function Items({ isCartVisible, cart, setCart, categories, dishes, products }) {
    const { t } = useTranslation();
    const [activeSection, setActiveSection] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    const soldSeparatelydDishesMap = new Map(
        dishes.filter((dish) => dish.is_SoldSeparately).map((dish) => [dish.id, dish]),
    );
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
    };

    const settings = {
        ...swiperSetting,
        onTransitionStart: () => setIsDragging(true),
        onTransitionEnd: () => setIsDragging(false),
        preventClicks: isDragging,
        preventClicksPropagation: isDragging,
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

        let foundItem = newCart.find(
            (cartItem) => cartItem.id === item.id && cartItem.type === itemType,
        );

        if (foundItem) {
            foundItem.quantity += 1;
        } else {
            const emptyIndex = newCart.findIndex((cartItem) => cartItem.id === null);
            if (emptyIndex !== -1) {
                newCart[emptyIndex] = { ...item, quantity: 1, client_price: price, type: itemType };
            } else {
                newCart.push({ ...item, quantity: 1, client_price: price, type: itemType });
            }
        }
        setCart(newCart);
    };

    const swiperSlideClasses = clsx(
        'm-2 mx-auto flex h-[82px] w-[82px] flex-col items-center justify-center rounded-lg bg-white p-4 transition duration-300 ease-linear',
        'hover:bg-gray-200',
        'focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2',
        'active:bg-gray-200',
        'disabled:cursor-not-allowed disabled:opacity-25',

        'dark:bg-gray-800',
        'dark:hover:bg-gray-700',
        'dark:focus:bg-gray-700 dark:focus:ring-offset-gray-800',
        'dark:active:bg-gray-700',
    );

    return (
        <div className={`${isCartVisible ? 'hidden sm:block' : 'block'}`}>
            {/* Return Dishes */}
            {returnDishesMap.size > 0 && (
                <div
                    className={clsx(
                        'mt-6 flex cursor-pointer flex-col justify-center gap-2 rounded-lg bg-gray-100 text-gray-900 transition duration-300 ease-linear dark:bg-gray-900 dark:text-gray-100',
                        {
                            'p-4 !pt-0 sm:p-8': activeSection === 'return',
                            'p-0': activeSection !== 'return',
                        },
                    )}
                >
                    <h3
                        className={clsx({
                            '!pb-0 pt-4 sm:pt-8': activeSection === 'return',
                            'p-4 sm:p-8': activeSection !== 'return',
                        })}
                        onClick={() => toggleSection('return')}
                    >
                        {t('Return Dishes')}
                    </h3>
                    {activeSection === 'return' && (
                        <div>
                            <Swiper {...settings}>
                                {[...returnDishesMap.values()].map((dish) => (
                                    <SwiperSlide key={dish.id} className='pt-4'>
                                        <button
                                            onClick={() => {
                                                if (!isDragging) {
                                                    addToCart(dish, 'return');
                                                }
                                            }}
                                            className={swiperSlideClasses}
                                            disabled={isDragging}
                                        >
                                            {dish.picture_url ? (
                                                <>
                                                    <img
                                                        className='mx-auto'
                                                        src={dish.picture_url}
                                                        alt={dish.name}
                                                        width={50}
                                                        height={50}
                                                    />
                                                    <p>{dish.unit}</p>
                                                </>
                                            ) : (
                                                <p>{`${dish.name} ${dish.unit}`}</p>
                                            )}
                                        </button>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    )}
                </div>
            )}
            {/* Products */}
            {categories &&
                categories
                    .filter((category) => {
                        const filteredProducts = products.filter(
                            (p) => p.cr_categories_products.id === category.id,
                        );
                        return filteredProducts.length > 0;
                    })
                    .map((category) => {
                        const filteredProducts = products.filter(
                            (p) => p.cr_categories_products.id === category.id,
                        );
                        return (
                            <div
                                key={category.id}
                                className={clsx(
                                    'mt-6 flex cursor-pointer flex-col gap-2 rounded-lg bg-gray-100 text-gray-900 transition duration-300 ease-linear',
                                    'dark:bg-gray-900 dark:text-gray-100',
                                    {
                                        'p-4 !pt-0 sm:p-8': activeSection === category.id,
                                        'p-0': activeSection !== category.id,
                                    },
                                )}
                            >
                                <h3
                                    className={clsx({
                                        '!pb-0 pt-4 sm:pt-8': activeSection === category.id,
                                        'p-4 sm:p-8': activeSection !== category.id,
                                    })}
                                    onClick={() => toggleSection(category.id)}
                                >
                                    {t(category.name)}
                                </h3>
                                {activeSection === category.id && (
                                    <div>
                                        <Swiper {...settings}>
                                            {filteredProducts.map((product) => (
                                                <SwiperSlide key={product.id} className='pt-4'>
                                                    <button
                                                        onClick={() => {
                                                            if (!isDragging) {
                                                                addToCart(product, 'product');
                                                            }
                                                        }}
                                                        className={swiperSlideClasses}
                                                        disabled={isDragging}
                                                    >
                                                        {product.picture_url ? (
                                                            <>
                                                                <img
                                                                    className='mx-auto'
                                                                    src={product.picture_url}
                                                                    alt={product.name}
                                                                    width={50}
                                                                    height={50}
                                                                />
                                                                <p>{product.unit}</p>
                                                            </>
                                                        ) : (
                                                            <p>{`${product.name} ${product.unit}`}</p>
                                                        )}
                                                    </button>
                                                </SwiperSlide>
                                            ))}
                                            <div className='swiper-pagination swiper-pagination-progressbar swiper-pagination-horizontal'>
                                                {/*renderProgressbar*/}
                                            </div>
                                        </Swiper>
                                    </div>
                                )}
                            </div>
                        );
                    })}
            {/* Dishes */}
            {soldSeparatelydDishesMap.size > 0 && (
                <div
                    className={clsx(
                        'mt-6 flex cursor-pointer flex-col gap-2 rounded-lg bg-gray-100 text-gray-900 transition duration-300 ease-linear',
                        'dark:bg-gray-900 dark:text-gray-100',
                        {
                            'p-4 !pt-0 sm:p-8': activeSection === 'dishes',
                            'p-0': activeSection !== 'dishes',
                        },
                    )}
                >
                    <h3
                        className={clsx({
                            '!pb-0 pt-4 sm:pt-8': activeSection === 'dishes',
                            'p-4 sm:p-8': activeSection !== 'dishes',
                        })}
                        onClick={() => toggleSection('dishes')}
                    >
                        {t('Dishes')}
                    </h3>
                    {activeSection === 'dishes' && (
                        <div>
                            <Swiper {...settings}>
                                {[...soldSeparatelydDishesMap.values()].map((dish) => (
                                    <SwiperSlide key={dish.id} className='pt-4'>
                                        <button
                                            onClick={() => {
                                                if (!isDragging) {
                                                    addToCart(dish, 'dishes');
                                                }
                                            }}
                                            className={swiperSlideClasses}
                                            disabled={isDragging}
                                        >
                                            {dish.picture_url ? (
                                                <>
                                                    <img
                                                        className='mx-auto'
                                                        src={dish.picture_url}
                                                        alt={dish.name}
                                                        width={50}
                                                        height={50}
                                                    />
                                                    <p>{dish.unit}</p>
                                                </>
                                            ) : (
                                                <p>{`${dish.name} ${dish.unit}`}</p>
                                            )}
                                        </button>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
