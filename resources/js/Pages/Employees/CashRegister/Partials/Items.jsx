import { swiperSetting } from "@/Config/swiperConfig";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "swiper/css/bundle";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Items({
    isCartVisible,
    cart,
    setCart,
    categories,
    dishes, // Flavien, on dirait que cette props est utilisée que pour faire une `Map`, il serait peut être plus simple de faire la `Map` dans le composant parent et la passer en props
    products,
}) {
    const { t } = useTranslation();
    const [activeSection, setActiveSection] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    {
        // Flavien, une partie de cette logique (jusqu'au useEffect) pourrait être faite dans un custom hook pour faciliter la lecture du composant.
        // C'est une préférence personnelle.
        /* Create maps for dishes and products */
    }
    const soldSeparatelydDishesMap = new Map(
        dishes
            .filter((dish) => dish.is_SoldSeparately)
            .map((dish) => [dish.id, dish]),
    );
    const productsDishesMap = products.reduce((dishes, product) => {
        if (product.cr_dishes && product.cr_dishes.name !== "No dish") {
            dishes.set(product.cr_dishes.id, product.cr_dishes);
        }
        return dishes;
    }, new Map());
    const returnDishesMap = new Map([
        ...soldSeparatelydDishesMap,
        ...productsDishesMap,
    ]);

    {
        // Flavien, le commentaire est pas tout à fait juste, le useEffect va être appelé à chaque fois que la variable `categories` change
        // et n'est pas utilisé que pour initialiser les valeurs.
        /* Set initial active section based on data */
    }
    useEffect(() => {
        if (productsDishesMap.size > 0) {
            setActiveSection("return");
        } else if (categories && categories.length > 0) {
            setActiveSection(categories[0].id);
        }
    }, [categories]);

    {
        /* Toggle section visibility */
    }
    const toggleSection = (section) => {
        activeSection === section
            ? setActiveSection(null)
            : setActiveSection(section);
    };

    {
        // Flavien, Swiper n'est utilisé que ici, donc pas de problème.
        // Mais si tu utilisais ça à plusieurs endroits, il faudrait peut être extraire tout ça dans un hook custom.
        /* Swiper settings */
    }
    const settings = {
        ...swiperSetting,
        onTransitionStart: () => setIsDragging(true),
        onTransitionEnd: () => setIsDragging(false),
        preventClicks: isDragging,
        preventClicksPropagation: isDragging,
    };

    {
        /* Add item to cart */
    }
    const addToCart = (item, itemType) => {
        let newCart = [...cart]; // Flavien, peut être un `const` et pas un `let`, par défaut je fais toujours des `const` et je passe en `let` si j'ai besoin de modifier la variable
        let price = parseFloat(item.client_price); // Flavien, petit trick, tu peux faire `+item.client_price` pour convertir en nombre

        if (itemType === "return") {
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
            const emptyIndex = newCart.findIndex(
                (cartItem) => cartItem.id === null,
            );
            if (emptyIndex !== -1) {
                newCart[emptyIndex] = {
                    ...item,
                    quantity: 1,
                    client_price: price,
                    type: itemType,
                };
            } else {
                newCart.push({
                    ...item,
                    quantity: 1,
                    client_price: price,
                    type: itemType,
                });
            }
        }
        setCart(newCart);
    };

    return (
        // Flavien: il y a le package CLSX qui te permet de simplifier les conditions pour ajouter des classes aux éléments: https://www.npmjs.com/package/clsx
        <div className={`${isCartVisible ? "hidden sm:block" : "block"}`}>
            {/* Return Dishes */}
            {returnDishesMap.size > 0 && (
                <div
                    className={`${
                        activeSection === "return" ? "p-4 !pt-0 sm:p-8" : "p-0"
                    } mt-6 flex cursor-pointer flex-col justify-center gap-2 rounded-lg bg-gray-100 text-gray-900 transition duration-300 ease-linear dark:bg-gray-900 dark:text-gray-100`}
                >
                    <h3
                        className={`${
                            activeSection === "return"
                                ? "!pb-0 pt-4 sm:pt-8"
                                : "p-4 sm:p-8"
                        }`}
                        onClick={() => toggleSection("return")}
                    >
                        {t("Return Dishes")}
                    </h3>
                    {activeSection === "return" && (
                        <div>
                            <Swiper {...settings}>
                                {[...returnDishesMap.values()].map((dish) => (
                                    <SwiperSlide key={dish.id} className="pt-4">
                                        <button
                                            onClick={() => {
                                                if (!isDragging) {
                                                    addToCart(dish, "return");
                                                }
                                            }}
                                            className="m-2 mx-auto flex h-[82px] w-[82px] flex-col items-center justify-center rounded-lg bg-white p-4 transition duration-300 ease-linear hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 active:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-25 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:bg-gray-700 dark:focus:ring-offset-gray-800 dark:active:bg-gray-700"
                                            disabled={isDragging}
                                        >
                                            {dish.picture_url ? (
                                                <>
                                                    <img
                                                        className="mx-auto"
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
            {/* Flavien: plutôt que de mettre un commentaires, j'aurais extrait le code dans un composant */}
            {/* ça permet de réduire la taille du composant et de le rendre plus lisible */}
            {/* categories && <ShowCategories categories={categories} ... /> */}
            {/* Tout le traitement de filter et map pourrait être fait dans le composant au lieu d'ici  */}

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
                                className={`${
                                    activeSection === category.id
                                        ? "p-4 !pt-0 sm:p-8"
                                        : "p-0"
                                } mt-6 flex cursor-pointer flex-col gap-2 rounded-lg bg-gray-100 text-gray-900 transition duration-300 ease-linear dark:bg-gray-900 dark:text-gray-100`}
                            >
                                <h3
                                    className={`${
                                        activeSection === category.id
                                            ? "!pb-0 pt-4 sm:pt-8"
                                            : "p-4 sm:p-8"
                                    }`}
                                    onClick={() => toggleSection(category.id)}
                                >
                                    {t(category.name)}
                                </h3>
                                {activeSection === category.id && (
                                    <div>
                                        <Swiper {...settings}>
                                            {filteredProducts.map((product) => (
                                                <SwiperSlide
                                                    key={product.id}
                                                    className="pt-4"
                                                >
                                                    {/* Flavien: je pense que ça devrait être un composant réutilisé */}
                                                    <button
                                                        onClick={() => {
                                                            if (!isDragging) {
                                                                addToCart(
                                                                    product,
                                                                    "product",
                                                                );
                                                            }
                                                        }}
                                                        className="m-2 mx-auto flex h-[82px] w-[82px] flex-col items-center justify-center rounded-lg bg-white p-4 transition duration-300 ease-linear hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 active:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-25 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:bg-gray-700 dark:focus:ring-offset-gray-800 dark:active:bg-gray-700"
                                                        disabled={isDragging}
                                                    >
                                                        {product.picture_url ? (
                                                            <>
                                                                <img
                                                                    className="mx-auto"
                                                                    src={
                                                                        product.picture_url
                                                                    }
                                                                    alt={
                                                                        product.name
                                                                    }
                                                                    width={50}
                                                                    height={50}
                                                                />
                                                                {/* Flavien: Il faudrait éviter les paragraphe dans les boutons et utiliser des span à la place */}
                                                                <p>
                                                                    {
                                                                        product.unit
                                                                    }
                                                                </p>
                                                            </>
                                                        ) : (
                                                            <p>{`${product.name} ${product.unit}`}</p>
                                                        )}
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
                        );
                    })}
            {/* Flavien: pareil qu'avant, je déplacerait ce code dans un autre composant */}

            {/* Dishes */}
            {soldSeparatelydDishesMap.size > 0 && (
                <div
                    className={`${
                        activeSection === "dishes" ? "p-4 !pt-0 sm:p-8" : "p-0"
                    } mt-6 flex cursor-pointer flex-col justify-center gap-2 rounded-lg bg-gray-100 text-gray-900 transition duration-300 ease-linear dark:bg-gray-900 dark:text-gray-100`}
                >
                    <h3
                        className={`${
                            activeSection === "dishes"
                                ? "!pb-0 pt-4 sm:pt-8"
                                : "p-4 sm:p-8"
                        }`}
                        onClick={() => toggleSection("dishes")}
                    >
                        {t("Dishes")}
                    </h3>
                    {activeSection === "dishes" && (
                        <div>
                            <Swiper {...settings}>
                                {[...soldSeparatelydDishesMap.values()].map(
                                    (dish) => (
                                        <SwiperSlide
                                            key={dish.id}
                                            className="pt-4"
                                        >
                                            <button
                                                onClick={() => {
                                                    if (!isDragging) {
                                                        addToCart(
                                                            dish,
                                                            "dishes",
                                                        );
                                                    }
                                                }}
                                                className="m-2 mx-auto flex h-[82px] w-[82px] flex-col items-center justify-center rounded-lg bg-white p-4 transition duration-300 ease-linear hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 active:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-25 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:bg-gray-700 dark:focus:ring-offset-gray-800 dark:active:bg-gray-700"
                                                disabled={isDragging}
                                            >
                                                {dish.picture_url ? (
                                                    <>
                                                        <img
                                                            className="mx-auto"
                                                            src={
                                                                dish.picture_url
                                                            }
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
                                    ),
                                )}
                            </Swiper>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
