import { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import CR_AppAdminLayout from '@/Layouts/CR_AppAdminLayout';
import CreateWorkstationForm from './Partials/CreateWorkstationForm';
import UpdateWorkstationForm from './Partials/UpdateWorkstationForm';
import DeleteWorkstationForm from './Partials/DeleteWorstationForm';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

export default function Index({ customerAuth, application, workstations, localization }) {
    const { t } = useTranslation();

    {
        /* Get the default workstation ID for "Pending Assignment" */
    }
    const defaultWorkstationId = application.cr_workstations.find(
        (workstation) => workstation.name === 'Pending assignement',
    ).id;

    {
        /* State to hold the updated workstations */
    }
    const [updatedWorkstations, setUpdatedWorkstations] = useState(workstations);

    {
        /* Update the state when the 'workstations' prop changes */
    }
    useEffect(() => {
        setUpdatedWorkstations(workstations);
    }, [workstations]);

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
        if (destination.droppableId === source.droppableId) {
            return;
        }

        {
            /* Determine the type of source (employees or products) */
        }
        const sourceType = source.droppableId.includes('employee') ? 'employees' : 'products';
        const sourceId = parseInt(source.droppableId.split('-')[1]);
        const destinationId = parseInt(destination.droppableId.split('-')[1]);

        {
            /* Find the source and destination workstations based on their IDs */
        }
        const sourceWorkstation = updatedWorkstations.find(
            (workstation) => workstation.id === sourceId,
        );
        const destinationWorkstation = updatedWorkstations.find(
            (workstation) => workstation.id === destinationId,
        );

        if (sourceType === 'employees') {
            {
                /* Get the employee being moved */
            }
            const movedEmployee = sourceWorkstation.cr_employees[source.index];

            {
                /* If the source and destination workstations are the same, return */
            }
            if (sourceWorkstation === destinationWorkstation) {
                return;
            } else {
                {
                    /* Remove the employee from the source workstation and add to the destination workstation */
                }
                sourceWorkstation.cr_employees.splice(source.index, 1);
                destinationWorkstation.cr_employees.splice(destination.index, 0, movedEmployee);
            }

            {
                /* Update the server using Axios */
            }
            await axios
                .patch(route('employees.updateDragAndDrop'), {
                    workstations: updatedWorkstations,
                })
                .then(function (response) {
                    {
                        /* Update the state with the response data */
                    }
                    setUpdatedWorkstations(response.data.workstations);
                });
        } else if (sourceType === 'products') {
            {
                /* Determine the source products based on the source ID */
            }
            const sourceProducts =
                sourceId === 0
                    ? destinationWorkstation.generalProducts
                    : sourceWorkstation.cr_products;

            {
                /* Get the product being moved */
            }
            const movedProduct = sourceProducts[source.index];

            {
                /* If the source ID is 0, it's a general product move */
            }
            if (sourceId === 0) {
                {
                    /* Update destination and source workstations accordingly */
                }
                destinationWorkstation.cr_products.splice(destination.index, 0, movedProduct);
                destinationWorkstation.generalProducts.splice(source.index, 1);
            } else {
                {
                    /* Update source workstation products accordingly */
                }
                sourceWorkstation.generalProducts.splice(destination.index, 0, movedProduct);
                sourceWorkstation.cr_products.splice(source.index, 1);
            }

            {
                /* Update the server using Axios */
            }
            await axios
                .patch(route('products.updateDragAndDrop'), {
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
            <div className='mx-auto max-w-7xl space-y-6 px-2 sm:px-6 lg:px-8'>
                <div className='rounded-lg bg-white p-4 shadow-md transition duration-300 ease-linear sm:p-8 dark:bg-gray-800'>
                    <CreateWorkstationForm className='mx-auto max-w-xl' application={application} />
                </div>
                {updatedWorkstations.length > 1 ? (
                    <ul className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3'>
                        {updatedWorkstations.slice(1).map((workstation) => (
                            <li
                                className='flex flex-col rounded-lg bg-white p-4 text-gray-900 shadow-md transition duration-300 ease-linear sm:p-8 dark:bg-gray-800 dark:text-gray-100'
                                key={workstation.id}
                            >
                                <div className='flex items-center justify-between border-b border-gray-300 pb-4 drop-shadow-sm dark:border-gray-700 dark:drop-shadow-none'>
                                    <h3>{workstation.name}</h3>
                                    <div className='flex gap-2'>
                                        <UpdateWorkstationForm workstation={workstation} />
                                        <DeleteWorkstationForm workstation={workstation} />
                                    </div>
                                </div>
                                <DragDropContext onDragEnd={onDragEnd}>
                                    <div className='mt-4 flex h-full gap-2'>
                                        <div className='flex h-full w-1/2 flex-col'>
                                            <h4 className='text-center underline'>
                                                {t('Employee')}
                                            </h4>
                                            <Droppable
                                                droppableId={`workstation-${workstation.id}-employees`}
                                            >
                                                {(provided, snapshot) => (
                                                    <ul
                                                        className={`mt-2 flex flex-grow flex-col gap-1 p-2 ${
                                                            snapshot.isDraggingOver
                                                                ? 'rounded-md bg-gray-100 transition duration-300 ease-linear dark:bg-gray-900'
                                                                : ''
                                                        }`}
                                                        ref={provided.innerRef}
                                                        {...provided.droppableProps}
                                                    >
                                                        {workstation.cr_employees &&
                                                        workstation.cr_employees.length > 0
                                                            ? workstation.cr_employees.map(
                                                                  (cr_employee, index) => (
                                                                      <Draggable
                                                                          key={cr_employee.id}
                                                                          draggableId={`employee-${cr_employee.id}`}
                                                                          index={index}
                                                                      >
                                                                          {(provided, snapshot) => (
                                                                              <li
                                                                                  ref={
                                                                                      provided.innerRef
                                                                                  }
                                                                                  {...provided.draggableProps}
                                                                                  {...provided.dragHandleProps}
                                                                                  key={
                                                                                      cr_employee.id
                                                                                  }
                                                                                  className={`rounded-md border-2 border-sky-400 bg-white p-1 text-gray-900 shadow-sm transition duration-300 ease-linear hover:bg-gray-200 hover:duration-150 dark:border-sky-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 ${
                                                                                      snapshot.isDragging
                                                                                          ? 'bg-sky-500'
                                                                                          : ''
                                                                                  }`}
                                                                              >
                                                                                  <div className='flex items-center justify-center gap-2 overflow-auto'>
                                                                                      <p>
                                                                                          {
                                                                                              cr_employee.first_name
                                                                                          }
                                                                                      </p>
                                                                                      <p>
                                                                                          {cr_employee.last_name.charAt(
                                                                                              0,
                                                                                          )}
                                                                                          .
                                                                                      </p>
                                                                                  </div>
                                                                              </li>
                                                                          )}
                                                                      </Draggable>
                                                                  ),
                                                              )
                                                            : null}
                                                        {provided.placeholder}
                                                    </ul>
                                                )}
                                            </Droppable>
                                        </div>
                                        <div className='border-r border-gray-300 dark:border-gray-700'></div>
                                        <div className='flex h-full w-1/2 flex-col'>
                                            <h4 className='text-center underline'>
                                                {t('Employee Free')}
                                            </h4>
                                            <Droppable
                                                droppableId={`workstation-${defaultWorkstationId}-employees`}
                                            >
                                                {(provided, snapshot) => (
                                                    <ul
                                                        className={`mt-2 flex flex-grow flex-col gap-1.5 p-2 ${
                                                            snapshot.isDraggingOver
                                                                ? 'rounded-md bg-gray-100 transition duration-300 ease-linear dark:bg-gray-900'
                                                                : ''
                                                        }`}
                                                        ref={provided.innerRef}
                                                        {...provided.droppableProps}
                                                    >
                                                        {updatedWorkstations[0].cr_employees &&
                                                        updatedWorkstations[0].cr_employees.length >
                                                            0
                                                            ? updatedWorkstations[0].cr_employees.map(
                                                                  (cr_employee, index) => (
                                                                      <Draggable
                                                                          key={cr_employee.id}
                                                                          draggableId={`employee-${cr_employee.id}`}
                                                                          index={index}
                                                                      >
                                                                          {(provided, snapshot) => (
                                                                              <li
                                                                                  ref={
                                                                                      provided.innerRef
                                                                                  }
                                                                                  {...provided.draggableProps}
                                                                                  {...provided.dragHandleProps}
                                                                                  key={
                                                                                      cr_employee.id
                                                                                  }
                                                                                  className={`rounded-md border-2 border-sky-400 bg-white p-1 text-gray-900 shadow-sm transition duration-300 ease-linear hover:bg-gray-200 hover:duration-150 dark:border-sky-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 ${
                                                                                      snapshot.isDragging
                                                                                          ? 'bg-sky-500'
                                                                                          : ''
                                                                                  }`}
                                                                              >
                                                                                  <div className='flex items-center justify-center gap-2 overflow-auto'>
                                                                                      <p>
                                                                                          {
                                                                                              cr_employee.first_name
                                                                                          }
                                                                                      </p>
                                                                                      <p>
                                                                                          {cr_employee.last_name.charAt(
                                                                                              0,
                                                                                          )}
                                                                                          .
                                                                                      </p>
                                                                                  </div>
                                                                              </li>
                                                                          )}
                                                                      </Draggable>
                                                                  ),
                                                              )
                                                            : null}
                                                        {provided.placeholder}
                                                    </ul>
                                                )}
                                            </Droppable>
                                        </div>
                                    </div>
                                </DragDropContext>
                                <DragDropContext onDragEnd={onDragEnd}>
                                    <div className='mt-4 flex h-full gap-2'>
                                        <div className='flex h-full w-1/2 flex-col'>
                                            <h4 className='text-center underline'>
                                                {t('Products')}
                                            </h4>
                                            <Droppable
                                                droppableId={`workstation-${workstation.id}-products`}
                                            >
                                                {(provided, snapshot) => (
                                                    <ul
                                                        className={`mt-2 flex flex-grow flex-col gap-1 p-2 ${
                                                            snapshot.isDraggingOver
                                                                ? 'rounded-md bg-gray-100 transition duration-300 ease-linear dark:bg-gray-900'
                                                                : ''
                                                        }`}
                                                        ref={provided.innerRef}
                                                        {...provided.droppableProps}
                                                    >
                                                        {workstation.cr_products.map(
                                                            (cr_product, index) => (
                                                                <Draggable
                                                                    key={cr_product.id}
                                                                    draggableId={`product-${cr_product.id}`}
                                                                    index={index}
                                                                >
                                                                    {(provided, snapshot) => (
                                                                        <li
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                            key={cr_product.id}
                                                                            className={`rounded-md border-2 border-sky-400 bg-white p-1 text-gray-900 shadow-sm transition duration-300 ease-linear hover:bg-gray-200 hover:duration-150 dark:border-sky-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 ${
                                                                                snapshot.isDragging
                                                                                    ? 'bg-sky-500'
                                                                                    : ''
                                                                            }`}
                                                                        >
                                                                            <div className='flex items-center justify-center gap-2 overflow-auto'>
                                                                                <p>
                                                                                    {
                                                                                        cr_product.name
                                                                                    }
                                                                                </p>
                                                                                <p>
                                                                                    {
                                                                                        cr_product.unit
                                                                                    }
                                                                                    .
                                                                                </p>
                                                                            </div>
                                                                        </li>
                                                                    )}
                                                                </Draggable>
                                                            ),
                                                        )}
                                                        {provided.placeholder}
                                                    </ul>
                                                )}
                                            </Droppable>
                                        </div>
                                        <div className='border-r border-gray-300 dark:border-gray-700'></div>
                                        <div className='flex h-full w-1/2 flex-col'>
                                            <h4 className='text-center underline'>
                                                {t('Products')}
                                            </h4>
                                            <Droppable droppableId={`products-0`}>
                                                {(provided, snapshot) => (
                                                    <ul
                                                        className={`mt-2 flex flex-grow flex-col gap-1.5 p-2 ${
                                                            snapshot.isDraggingOver
                                                                ? 'rounded-md bg-gray-100 transition duration-300 ease-linear dark:bg-gray-900'
                                                                : ''
                                                        }`}
                                                        ref={provided.innerRef}
                                                        {...provided.droppableProps}
                                                    >
                                                        {workstation.generalProducts.map(
                                                            (product, index) => (
                                                                <Draggable
                                                                    key={product.id}
                                                                    draggableId={`product-${product.id}`}
                                                                    index={index}
                                                                >
                                                                    {(provided, snapshot) => (
                                                                        <li
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                            key={product.id}
                                                                            className={`rounded-md border-2 border-sky-400 bg-white p-1 text-gray-900 shadow-sm transition duration-300 ease-linear hover:bg-gray-200 hover:duration-150 dark:border-sky-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 ${
                                                                                snapshot.isDragging
                                                                                    ? 'bg-sky-500'
                                                                                    : ''
                                                                            }`}
                                                                        >
                                                                            <div className='flex items-center justify-center gap-2 overflow-auto'>
                                                                                <p>
                                                                                    {product.name}
                                                                                </p>
                                                                                <p>
                                                                                    {product.unit}.
                                                                                </p>
                                                                            </div>
                                                                        </li>
                                                                    )}
                                                                </Draggable>
                                                            ),
                                                        )}
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
                    <div className='bg-white p-4 text-center shadow transition duration-300 ease-linear sm:rounded-lg sm:p-8 dark:bg-gray-800'>
                        <p className='text-gray-900 dark:text-gray-100'>
                            {t('No workstation found.')}
                        </p>
                    </div>
                )}
            </div>
        </CR_AppAdminLayout>
    );
}
