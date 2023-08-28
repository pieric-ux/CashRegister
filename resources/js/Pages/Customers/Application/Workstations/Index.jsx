import { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import CR_AppAdminLayout from "@/Layouts/CR_AppAdminLayout";
import CreateWorkstationForm from "./Partials/CreateWorkstationForm";
import UpdateWorkstationForm from "./Partials/UpdateWorkstationForm";
import DeleteWorkstationForm from "./Partials/DeleteWorstationForm";
import axios from "axios";
import { useTranslation } from "react-i18next";

export default function Index({ customerAuth, application, workstations, localization }) {
    const { t } = useTranslation();

    {/* Get the default workstation ID for "Pending Assignment" */ }
    const defaultWorkstationId = application.cr_workstations.find((workstation) => workstation.name === 'Pending assignement').id;

    {/* State to hold the updated workstations */ }
    const [updatedWorkstations, setUpdatedWorkstations] = useState(workstations);

    {/* Update the state when the 'workstations' prop changes */ }
    useEffect(() => {
        setUpdatedWorkstations(workstations);
    }, [workstations]);

    {/* Callback for handling the end of a drag-and-drop operation */ }
    const onDragEnd = async (result) => {
        {/* Destructure the result to get the destination and source */ }
        const { destination, source } = result;

        {/* If there's no destination, return */ }
        if (!destination) {
            return;
        }

        {/* If the destination is the same as the source, return */ }
        if (
            destination.droppableId === source.droppableId
        ) {
            return;
        }

        {/* Determine the type of source (employees or products) */ }
        const sourceType = source.droppableId.includes("employee") ? "employees" : "products";
        const sourceId = parseInt(source.droppableId.split("-")[1]);
        const destinationId = parseInt(destination.droppableId.split("-")[1]);

        {/* Find the source and destination workstations based on their IDs */ }
        const sourceWorkstation = updatedWorkstations.find((workstation) => workstation.id === sourceId);
        const destinationWorkstation = updatedWorkstations.find((workstation) => workstation.id === destinationId);

        if (sourceType === 'employees') {
            {/* Get the employee being moved */ }
            const movedEmployee = sourceWorkstation.cr_employees[source.index];

            {/* If the source and destination workstations are the same, return */ }
            if (sourceWorkstation === destinationWorkstation) {
                return;
            } else {
                {/* Remove the employee from the source workstation and add to the destination workstation */ }
                sourceWorkstation.cr_employees.splice(source.index, 1);
                destinationWorkstation.cr_employees.splice(destination.index, 0, movedEmployee);
            }

            {/* Update the server using Axios */ }
            await axios.patch(route('employees.updateDragAndDrop'), {
                workstations: updatedWorkstations,
            })
                .then(function (response) {
                    {/* Update the state with the response data */ }
                    setUpdatedWorkstations(response.data.workstations);
                });
        }

        else if (sourceType === 'products') {
            {/* Determine the source products based on the source ID */ }
            const sourceProducts = sourceId === 0
                ? destinationWorkstation.generalProducts
                : sourceWorkstation.cr_products;

            {/* Get the product being moved */ }
            const movedProduct = sourceProducts[source.index];

            {/* If the source ID is 0, it's a general product move */ }
            if (sourceId === 0) {
                {/* Update destination and source workstations accordingly */ }
                destinationWorkstation.cr_products.splice(destination.index, 0, movedProduct);
                destinationWorkstation.generalProducts.splice(source.index, 1);
            }
            else {
                {/* Update source workstation products accordingly */ }
                sourceWorkstation.generalProducts.splice(destination.index, 0, movedProduct);
                sourceWorkstation.cr_products.splice(source.index, 1);
            }

            {/* Update the server using Axios */ }
            await axios.patch(route('products.updateDragAndDrop'), {
                workstations: updatedWorkstations,
            })
                .then(function (response) {
                    setUpdatedWorkstations(response.data.workstations);
                });
        }
    };

    return (
        <CR_AppAdminLayout
            auth={customerAuth}
            application={application}
            localization={localization}
        >
            <Head title={application.name} />
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow-md rounded-lg transition ease-linear duration-300">
                    <CreateWorkstationForm className="max-w-xl mx-auto" application={application} />
                </div>
                {updatedWorkstations.length > 1 ? (
                    <ul className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-4">
                        {updatedWorkstations.slice(1).map((workstation) => (
                            <li className="flex flex-col sm:p-8 p-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-md rounded-lg transition ease-linear duration-300" key={workstation.id}>
                                <div className="flex items-center justify-between pb-4 border-b border-gray-300 dark:border-gray-700 drop-shadow-sm dark:drop-shadow-none">
                                    <h3>{workstation.name}</h3>
                                    <div className="flex gap-2">
                                        <UpdateWorkstationForm workstation={workstation} />
                                        <DeleteWorkstationForm workstation={workstation} />
                                    </div>
                                </div>
                                <DragDropContext onDragEnd={onDragEnd}>
                                    <div className="flex h-full mt-4 gap-2">
                                        <div className="flex flex-col w-1/2 h-full">
                                            <h4 className="text-center underline">{t('Employee')}</h4>
                                            <Droppable droppableId={`workstation-${workstation.id}-employees`}>
                                                {(provided, snapshot) => (
                                                    <ul
                                                        className={`p-2 flex flex-col gap-1 flex-grow mt-2 ${(snapshot.isDraggingOver)
                                                            ? "bg-gray-100 dark:bg-gray-900 rounded-md transition ease-linear duration-300"
                                                            : ""
                                                            }`}
                                                        ref={provided.innerRef}
                                                        {...provided.droppableProps}
                                                    >
                                                        {workstation.cr_employees && workstation.cr_employees.length > 0 ? (
                                                            workstation.cr_employees.map((cr_employee, index) => (
                                                                <Draggable key={cr_employee.id} draggableId={`employee-${cr_employee.id}`} index={index}>
                                                                    {(provided, snapshot) => (
                                                                        <li
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                            key={cr_employee.id}
                                                                            className={`p-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-2 border-sky-400 dark:border-sky-600 hover:bg-gray-200 dark:hover:bg-gray-700 shadow-sm rounded-md transition ease-linear hover:duration-150 duration-300 ${snapshot.isDragging ? "bg-sky-500" : ""}`}                                                                        >
                                                                            <div className="flex items-center justify-center gap-2 overflow-auto">
                                                                                <p>{cr_employee.first_name}</p>
                                                                                <p>{cr_employee.last_name.charAt(0)}.</p>
                                                                            </div>
                                                                        </li>
                                                                    )}
                                                                </Draggable>
                                                            ))
                                                        ) : (null)}
                                                        {provided.placeholder}
                                                    </ul>
                                                )}
                                            </Droppable>
                                        </div>
                                        <div className="border-r border-gray-300 dark:border-gray-700"></div>
                                        <div className="flex flex-col w-1/2 h-full">
                                            <h4 className="text-center underline">{t('Employee Free')}</h4>
                                            <Droppable droppableId={`workstation-${defaultWorkstationId}-employees`}>
                                                {(provided, snapshot) => (
                                                    <ul
                                                        className={`p-2 flex flex-col gap-1.5 flex-grow mt-2 ${(snapshot.isDraggingOver)
                                                            ? "bg-gray-100 dark:bg-gray-900 rounded-md transition ease-linear duration-300"
                                                            : ""
                                                            }`}
                                                        ref={provided.innerRef}
                                                        {...provided.droppableProps}
                                                    >
                                                        {updatedWorkstations[0].cr_employees && updatedWorkstations[0].cr_employees.length > 0 ? (
                                                            updatedWorkstations[0].cr_employees.map((cr_employee, index) => (
                                                                <Draggable key={cr_employee.id} draggableId={`employee-${cr_employee.id}`} index={index}>
                                                                    {(provided, snapshot) => (
                                                                        <li
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                            key={cr_employee.id}
                                                                            className={`p-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-2 border-sky-400 dark:border-sky-600 hover:bg-gray-200 dark:hover:bg-gray-700 shadow-sm rounded-md transition ease-linear hover:duration-150 duration-300 ${snapshot.isDragging ? "bg-sky-500" : ""}`}
                                                                        >
                                                                            <div className="flex items-center justify-center gap-2 overflow-auto">
                                                                                <p>{cr_employee.first_name}</p>
                                                                                <p>{cr_employee.last_name.charAt(0)}.</p>
                                                                            </div>
                                                                        </li>
                                                                    )}
                                                                </Draggable>
                                                            ))
                                                        ) : (null)}
                                                        {provided.placeholder}
                                                    </ul>
                                                )}
                                            </Droppable>
                                        </div>
                                    </div>
                                </DragDropContext>
                                <DragDropContext onDragEnd={onDragEnd}>
                                    <div className="flex h-full mt-4 gap-2">
                                        <div className="flex flex-col w-1/2 h-full">
                                            <h4 className="text-center underline">{t('Products')}</h4>
                                            <Droppable droppableId={`workstation-${workstation.id}-products`}>
                                                {(provided, snapshot) => (
                                                    <ul
                                                        className={`p-2 flex flex-col gap-1 flex-grow mt-2 ${(snapshot.isDraggingOver)
                                                            ? "bg-gray-100 dark:bg-gray-900 rounded-md transition ease-linear duration-300"
                                                            : ""
                                                            }`}
                                                        ref={provided.innerRef}
                                                        {...provided.droppableProps}
                                                    >
                                                        {workstation.cr_products.map((cr_product, index) => (
                                                            <Draggable key={cr_product.id} draggableId={`product-${cr_product.id}`} index={index}>
                                                                {(provided, snapshot) => (
                                                                    <li
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        key={cr_product.id}
                                                                        className={`p-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-2 border-sky-400 dark:border-sky-600 hover:bg-gray-200 dark:hover:bg-gray-700 shadow-sm rounded-md transition ease-linear hover:duration-150 duration-300 ${snapshot.isDragging ? "bg-sky-500" : ""}`}                                                                        >
                                                                        <div className="flex items-center justify-center gap-2 overflow-auto">
                                                                            <p>{cr_product.name}</p>
                                                                            <p>{cr_product.unit}.</p>
                                                                        </div>
                                                                    </li>
                                                                )}
                                                            </Draggable>
                                                        ))}
                                                        {provided.placeholder}
                                                    </ul>
                                                )}
                                            </Droppable>
                                        </div>
                                        <div className="border-r border-gray-300 dark:border-gray-700"></div>
                                        <div className="flex flex-col w-1/2 h-full">
                                            <h4 className="text-center underline">{t('Products')}</h4>
                                            <Droppable droppableId={`products-0`}>
                                                {(provided, snapshot) => (
                                                    <ul
                                                        className={`p-2 flex flex-col gap-1.5 flex-grow mt-2 ${(snapshot.isDraggingOver)
                                                            ? "bg-gray-100 dark:bg-gray-900 rounded-md transition ease-linear duration-300"
                                                            : ""
                                                            }`}
                                                        ref={provided.innerRef}
                                                        {...provided.droppableProps}
                                                    >
                                                        {workstation.generalProducts.map((product, index) => (
                                                            <Draggable key={product.id} draggableId={`product-${product.id}`} index={index}>
                                                                {(provided, snapshot) => (
                                                                    <li
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        key={product.id}
                                                                        className={`p-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-2 border-sky-400 dark:border-sky-600 hover:bg-gray-200 dark:hover:bg-gray-700 shadow-sm rounded-md transition ease-linear hover:duration-150 duration-300 ${snapshot.isDragging ? "bg-sky-500" : ""}`}
                                                                    >
                                                                        <div className="flex items-center justify-center gap-2 overflow-auto">
                                                                            <p>{product.name}</p>
                                                                            <p>{product.unit}.</p>
                                                                        </div>
                                                                    </li>
                                                                )}
                                                            </Draggable>
                                                        ))}
                                                        {provided.placeholder}
                                                    </ul>
                                                )}
                                            </Droppable>
                                        </div>
                                    </div>
                                </DragDropContext>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="p-4 sm:p-8 text-center bg-white dark:bg-gray-800 shadow sm:rounded-lg transition ease-linear duration-300">
                        <p className='text-gray-900 dark:text-gray-100'>{t('No workstation found.')}</p>
                    </div>
                )}
            </div>
        </CR_AppAdminLayout>
    )
}
