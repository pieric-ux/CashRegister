import { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import CR_AppAdminLayout from "@/Layouts/CR_AppAdminLayout";
import CreateCategorieProductForm from "./Partials/CreateCategorieProductForm";
import UpdateCategorieProductForm from "./Partials/UpdateCategorieProductFrom";
import DeleteCategorieProductForm from "./Partials/DeleteCategorieProductForm";
import axios from "axios";

export default function Index({ customerAuth, application, categories }) {

    const [updatedCategories, setUpdatedCategories] = useState(categories);

    useEffect(() => {
        setUpdatedCategories(categories);
    }, [categories]);

    const onDragEnd = async (result) => {
        const { destination, source } = result;

        if (!destination) {
            return;
        }

        if (
            destination.index === source.index
        ) {
            return;
        }

        const movedCategory = updatedCategories.splice(source.index, 1)[0];
        updatedCategories.splice(destination.index, 0, movedCategory);

        const updatedCategoriesWithOrder = updatedCategories.map((category, index) => {
            return {
                ...category,
                order: index,
            };
        });

        await axios.patch(route('categories.updateDragAndDrop'), {
            categories: updatedCategoriesWithOrder,
        })
            .then(function (response) {
                setUpdatedCategories(response.data.categories);
            })
            .catch(function (error) { });
    }

    return (
        <CR_AppAdminLayout auth={customerAuth} application={application}>
            <Head title={application.name} />
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow-md rounded-lg transition ease-linear duration-300">
                    <CreateCategorieProductForm className="max-w-xl mx-auto" application={application} />
                </div>
                {updatedCategories.length > 1 ? (
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="categories">
                            {(provided, snapshot) => (
                                <ul
                                    className={`grid grid-cols-1 gap-4 mt-4 ${(snapshot.isDraggingOver)
                                        ? "bg-gray-100 dark:bg-gray-900 rounded-md transition ease-linear duration-300"
                                        : ""
                                        }`}
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {updatedCategories.slice(1).map((category, index) =>
                                        <Draggable key={category.id} draggableId={`category-${category.id}`} index={index + 1}>
                                            {(provided) => (
                                                <li
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    key={category.id}
                                                    className="flex flex-col sm:p-8 p-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-md rounded-lg transition ease-linear duration-300"
                                                >
                                                    <div className="flex items-center justify-between drop-shadow-sm dark:drop-shadow-none">
                                                        <h3>{category.name}</h3>
                                                        <div className="flex gap-2">
                                                            <UpdateCategorieProductForm category={category} />
                                                            <DeleteCategorieProductForm category={category} />
                                                        </div>
                                                    </div>
                                                </li>
                                            )}
                                        </Draggable>
                                    )}
                                    {provided.placeholder}
                                </ul>
                            )}
                        </Droppable>
                    </DragDropContext>
                ) : (
                    <div className="p-4 sm:p-8 text-center bg-white dark:bg-gray-800 shadow sm:rounded-lg transition ease-linear duration-300">
                        <p className='text-gray-900 dark:text-gray-100'>No categories of products found.</p>
                    </div>
                )}
            </div>
        </CR_AppAdminLayout>
    );
}