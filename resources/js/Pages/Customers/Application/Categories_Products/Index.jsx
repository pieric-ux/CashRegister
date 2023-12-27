import { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import CR_AppAdminLayout from "@/Layouts/CR_AppAdminLayout";
import CreateCategorieProductForm from "./Partials/CreateCategorieProductForm";
import UpdateCategorieProductForm from "./Partials/UpdateCategorieProductFrom";
import DeleteCategorieProductForm from "./Partials/DeleteCategorieProductForm";
import axios from "axios";
import { useTranslation } from "react-i18next";

export default function Index({
    customerAuth,
    application,
    categories,
    localization,
}) {
    const { t } = useTranslation();

    {
        /* State to hold the updated categories */
    }
    const [updatedCategories, setUpdatedCategories] = useState(categories);

    {
        /* Update the state when the 'categories' prop changes */
    }
    useEffect(() => {
        setUpdatedCategories(categories);
    }, [categories]);

    {
        /* Callback for handling the end of a drag-and-drop operation */
    }
    const onDragEnd = async (result) => {
        {
            /* Destructure the result to get the destination and source */
        }
        const { destination, source } = result;

        {
            /* If there's no destination, return */
        }
        if (!destination) {
            return;
        }

        {
            /* If the destination is the same as the source, return */
        }
        if (destination.index === source.index) {
            return;
        }

        {
            /* Get the category being moved */
        }
        const movedCategory = updatedCategories.splice(source.index, 1)[0];

        {
            /* Insert the moved category at the destination index */
        }
        updatedCategories.splice(destination.index, 0, movedCategory);

        {
            /* Update the order of categories based on their new positions */
        }
        const updatedCategoriesWithOrder = updatedCategories.map(
            (category, index) => {
                return {
                    ...category,
                    order: index,
                };
            },
        );

        {
            /* Update the server using Axios */
        }
        await axios
            .patch(route("categories.updateDragAndDrop"), {
                categories: updatedCategoriesWithOrder,
            })
            .then(function (response) {
                {
                    /* Update the state with the response data */
                }
                setUpdatedCategories(response.data.categories);
            });
    };

    return (
        <CR_AppAdminLayout
            auth={customerAuth}
            application={application}
            localization={localization}
        >
            <Head title={application.name} />
            <div className="mx-auto max-w-7xl space-y-6 px-2 sm:px-6 lg:px-8">
                <div className="rounded-lg bg-white p-4 shadow-md transition duration-300 ease-linear dark:bg-gray-800 sm:p-8">
                    <CreateCategorieProductForm
                        className="mx-auto max-w-xl"
                        application={application}
                    />
                </div>
                {updatedCategories.length > 1 ? (
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="categories">
                            {(provided, snapshot) => (
                                <ul
                                    className={`mt-4 grid grid-cols-1 gap-4 ${
                                        snapshot.isDraggingOver
                                            ? "rounded-md bg-gray-100 transition duration-300 ease-linear dark:bg-gray-900"
                                            : ""
                                    }`}
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {updatedCategories
                                        .slice(1)
                                        .map((category, index) => (
                                            <Draggable
                                                key={category.id}
                                                draggableId={`category-${category.id}`}
                                                index={index + 1}
                                            >
                                                {(provided) => (
                                                    <li
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        key={category.id}
                                                        className="flex flex-col rounded-lg bg-white p-4 text-gray-900 shadow-md transition duration-300 ease-linear dark:bg-gray-800 dark:text-gray-100 sm:p-8"
                                                    >
                                                        <div className="flex items-center justify-between drop-shadow-sm dark:drop-shadow-none">
                                                            <h3>
                                                                {category.name}
                                                            </h3>
                                                            <div className="flex gap-2">
                                                                <UpdateCategorieProductForm
                                                                    category={
                                                                        category
                                                                    }
                                                                />
                                                                <DeleteCategorieProductForm
                                                                    category={
                                                                        category
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    </li>
                                                )}
                                            </Draggable>
                                        ))}
                                    {provided.placeholder}
                                </ul>
                            )}
                        </Droppable>
                    </DragDropContext>
                ) : (
                    <div className="bg-white p-4 text-center shadow transition duration-300 ease-linear dark:bg-gray-800 sm:rounded-lg sm:p-8">
                        <p className="text-gray-900 dark:text-gray-100">
                            {t("No categories of products found.")}
                        </p>
                    </div>
                )}
            </div>
        </CR_AppAdminLayout>
    );
}
