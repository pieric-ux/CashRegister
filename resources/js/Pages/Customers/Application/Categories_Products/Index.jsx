import clsx from 'clsx';
import { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import CR_AppAdminLayout from '@/Layouts/CR_AppAdminLayout';
import CreateCategorieProductForm from './Partials/CreateCategorieProductForm';
import UpdateCategorieProductForm from './Partials/UpdateCategorieProductFrom';
import DeleteCategorieProductForm from './Partials/DeleteCategorieProductForm';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

export default function Index({ customerAuth, application, categories, localization }) {
    const { t } = useTranslation();

    const [updatedCategories, setUpdatedCategories] = useState(categories);

    useEffect(() => {
        setUpdatedCategories(categories);
    }, [categories]);

    const onDragEnd = async (result) => {
        const { destination, source } = result;

        if (!destination) {
            return;
        }

        if (destination.index === source.index) {
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

        await axios
            .patch(route('categories.updateDragAndDrop'), {
                categories: updatedCategoriesWithOrder,
            })
            .then(function (response) {
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
            <div className='mx-auto max-w-7xl space-y-6 px-2 sm:px-6 lg:px-8'>
                <div
                    className={clsx(
                        'rounded-lg bg-white p-4 shadow-md transition duration-300 ease-linear sm:p-8',
                        'dark:bg-gray-800',
                    )}
                >
                    <CreateCategorieProductForm
                        className='mx-auto max-w-xl'
                        application={application}
                    />
                </div>
                {updatedCategories.length > 1 ? (
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId='categories'>
                            {(provided, snapshot) => (
                                <ul
                                    className={clsx('mt-4 grid grid-cols-1 gap-4', {
                                        'rounded-md bg-gray-100 transition duration-300 ease-linear dark:bg-gray-900':
                                            snapshot.isDraggingOver,
                                    })}
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {updatedCategories.slice(1).map((category, index) => (
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
                                                    className={clsx(
                                                        'flex flex-col rounded-lg bg-white p-4 text-gray-900 shadow-md transition duration-300 ease-linear sm:p-8',
                                                        'dark:bg-gray-800 dark:text-gray-100',
                                                    )}
                                                >
                                                    <div
                                                        className={clsx(
                                                            'flex items-center justify-between drop-shadow-sm',
                                                            'dark:drop-shadow-none',
                                                        )}
                                                    >
                                                        <h3>{category.name}</h3>
                                                        <div className='flex gap-2'>
                                                            <UpdateCategorieProductForm
                                                                category={category}
                                                            />
                                                            <DeleteCategorieProductForm
                                                                category={category}
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
                    <div
                        className={clsx(
                            'bg-white p-4 text-center shadow transition duration-300 ease-linear sm:rounded-lg sm:p-8',
                            'dark:bg-gray-800',
                        )}
                    >
                        <p className='text-gray-900 dark:text-gray-100'>
                            {t('No categories of products found.')}
                        </p>
                    </div>
                )}
            </div>
        </CR_AppAdminLayout>
    );
}
