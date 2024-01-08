import { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import clsx from 'clsx';
import axios from 'axios';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import CR_AppAdminLayout from '@/Layouts/CR_AppAdminLayout';
import CreateWorkstationForm from './Partials/CreateWorkstationForm';
import UpdateWorkstationForm from './Partials/UpdateWorkstationForm';
import DeleteWorkstationForm from './Partials/DeleteWorstationForm';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card/card';
import { Separator } from '@/Components/ui/separator/separator';

export default function Index({ customerAuth, application, workstations, localization }) {
    const { t } = useTranslation();

    const defaultWorkstationId = application.cr_workstations.find(
        (workstation) => workstation.name === 'Pending assignement',
    ).id;

    const [updatedWorkstations, setUpdatedWorkstations] = useState(workstations);

    useEffect(() => {
        setUpdatedWorkstations(workstations);
    }, [workstations]);

    const onDragEnd = async (result) => {
        const { destination, source } = result;

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId) {
            return;
        }

        const sourceType = source.droppableId.includes('employee') ? 'employees' : 'products';
        const sourceId = parseInt(source.droppableId.split('-')[1]);
        const destinationId = parseInt(destination.droppableId.split('-')[1]);

        const sourceWorkstation = updatedWorkstations.find(
            (workstation) => workstation.id === sourceId,
        );
        const destinationWorkstation = updatedWorkstations.find(
            (workstation) => workstation.id === destinationId,
        );

        if (sourceType === 'employees') {
            const movedEmployee = sourceWorkstation.cr_employees[source.index];

            if (sourceWorkstation === destinationWorkstation) {
                return;
            } else {
                sourceWorkstation.cr_employees.splice(source.index, 1);
                destinationWorkstation.cr_employees.splice(destination.index, 0, movedEmployee);
            }

            await axios
                .patch(route('employees.updateDragAndDrop'), {
                    workstations: updatedWorkstations,
                })
                .then(function (response) {
                    setUpdatedWorkstations(response.data.workstations);
                });
        } else if (sourceType === 'products') {
            const sourceProducts =
                sourceId === 0
                    ? destinationWorkstation.generalProducts
                    : sourceWorkstation.cr_products;

            const movedProduct = sourceProducts[source.index];

            if (sourceId === 0) {
                destinationWorkstation.cr_products.splice(destination.index, 0, movedProduct);
                destinationWorkstation.generalProducts.splice(source.index, 1);
            } else {
                sourceWorkstation.generalProducts.splice(destination.index, 0, movedProduct);
                sourceWorkstation.cr_products.splice(source.index, 1);
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
                <CreateWorkstationForm application={application} />

                {updatedWorkstations.length > 1 ? (
                    <div className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3'>
                        {updatedWorkstations.slice(1).map((workstation) => (
                            <Card key={workstation.id}>
                                <CardHeader variant={'flex-row'} className='justify-between'>
                                    <CardTitle>{workstation.name}</CardTitle>
                                    <div className='flex gap-2'>
                                        <UpdateWorkstationForm workstation={workstation} />
                                        <DeleteWorkstationForm workstation={workstation} />
                                    </div>
                                </CardHeader>
                                <Separator />
                                <CardContent>
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
                                                            className={clsx(
                                                                'mt-2 flex flex-grow flex-col gap-1 p-2',
                                                                {
                                                                    'rounded-md bg-gray-100 transition duration-300 ease-linear dark:bg-gray-900':
                                                                        snapshot.isDraggingOver,
                                                                },
                                                            )}
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
                                                                              {(
                                                                                  provided,
                                                                                  snapshot,
                                                                              ) => (
                                                                                  <li
                                                                                      ref={
                                                                                          provided.innerRef
                                                                                      }
                                                                                      {...provided.draggableProps}
                                                                                      {...provided.dragHandleProps}
                                                                                      key={
                                                                                          cr_employee.id
                                                                                      }
                                                                                      className={clsx(
                                                                                          'rounded-md border-2 border-sky-400 bg-white p-1 text-gray-900 shadow-sm transition duration-300 ease-linear',
                                                                                          'hover:bg-gray-200 hover:duration-150',

                                                                                          'dark:border-sky-600 dark:bg-gray-800 dark:text-gray-100',
                                                                                          'dark:hover:bg-gray-700',

                                                                                          {
                                                                                              'bg-sky-500':
                                                                                                  snapshot.isDragging,
                                                                                          },
                                                                                      )}
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
                                                            className={clsx(
                                                                'mt-2 flex flex-grow flex-col gap-1 p-2',
                                                                {
                                                                    'rounded-md bg-gray-100 transition duration-300 ease-linear dark:bg-gray-900':
                                                                        snapshot.isDraggingOver,
                                                                },
                                                            )}
                                                            ref={provided.innerRef}
                                                            {...provided.droppableProps}
                                                        >
                                                            {updatedWorkstations[0].cr_employees &&
                                                            updatedWorkstations[0].cr_employees
                                                                .length > 0
                                                                ? updatedWorkstations[0].cr_employees.map(
                                                                      (cr_employee, index) => (
                                                                          <Draggable
                                                                              key={cr_employee.id}
                                                                              draggableId={`employee-${cr_employee.id}`}
                                                                              index={index}
                                                                          >
                                                                              {(
                                                                                  provided,
                                                                                  snapshot,
                                                                              ) => (
                                                                                  <li
                                                                                      ref={
                                                                                          provided.innerRef
                                                                                      }
                                                                                      {...provided.draggableProps}
                                                                                      {...provided.dragHandleProps}
                                                                                      key={
                                                                                          cr_employee.id
                                                                                      }
                                                                                      className={clsx(
                                                                                          'rounded-md border-2 border-sky-400 bg-white p-1 text-gray-900 shadow-sm transition duration-300 ease-linear',
                                                                                          'hover:bg-gray-200 hover:duration-150',

                                                                                          'dark:border-sky-600 dark:bg-gray-800 dark:text-gray-100',
                                                                                          'dark:hover:bg-gray-700',

                                                                                          {
                                                                                              'bg-sky-500':
                                                                                                  snapshot.isDragging,
                                                                                          },
                                                                                      )}
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
                                                            className={clsx(
                                                                'mt-2 flex flex-grow flex-col gap-1 p-2',
                                                                {
                                                                    'rounded-md bg-gray-100 transition duration-300 ease-linear dark:bg-gray-900':
                                                                        snapshot.isDraggingOver,
                                                                },
                                                            )}
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
                                                                                ref={
                                                                                    provided.innerRef
                                                                                }
                                                                                {...provided.draggableProps}
                                                                                {...provided.dragHandleProps}
                                                                                key={cr_product.id}
                                                                                className={clsx(
                                                                                    'rounded-md border-2 border-sky-400 bg-white p-1 text-gray-900 shadow-sm transition duration-300 ease-linear',
                                                                                    'hover:bg-gray-200 hover:duration-150',

                                                                                    'dark:border-sky-600 dark:bg-gray-800 dark:text-gray-100',
                                                                                    'dark:hover:bg-gray-700',

                                                                                    {
                                                                                        'bg-sky-500':
                                                                                            snapshot.isDragging,
                                                                                    },
                                                                                )}
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
                                                            className={clsx(
                                                                'mt-2 flex flex-grow flex-col gap-1 p-2',
                                                                {
                                                                    'rounded-md bg-gray-100 transition duration-300 ease-linear dark:bg-gray-900':
                                                                        snapshot.isDraggingOver,
                                                                },
                                                            )}
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
                                                                                ref={
                                                                                    provided.innerRef
                                                                                }
                                                                                {...provided.draggableProps}
                                                                                {...provided.dragHandleProps}
                                                                                key={product.id}
                                                                                className={clsx(
                                                                                    'rounded-md border-2 border-sky-400 bg-white p-1 text-gray-900 shadow-sm transition duration-300 ease-linear',
                                                                                    'hover:bg-gray-200 hover:duration-150',

                                                                                    'dark:border-sky-600 dark:bg-gray-800 dark:text-gray-100',
                                                                                    'dark:hover:bg-gray-700',

                                                                                    {
                                                                                        'bg-sky-500':
                                                                                            snapshot.isDragging,
                                                                                    },
                                                                                )}
                                                                            >
                                                                                <div className='flex items-center justify-center gap-2 overflow-auto'>
                                                                                    <p>
                                                                                        {
                                                                                            product.name
                                                                                        }
                                                                                    </p>
                                                                                    <p>
                                                                                        {
                                                                                            product.unit
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
                                        </div>
                                    </DragDropContext>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card>
                        <CardHeader size={'xl'} className='items-center'>
                            {t('No workstation found.')}
                        </CardHeader>
                    </Card>
                )}
            </div>
        </CR_AppAdminLayout>
    );
}
