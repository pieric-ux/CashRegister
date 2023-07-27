import { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import CR_AppAdminLayout from "@/Layouts/CR_AppAdminLayout";
import CreateWorkstationForm from "./Partials/CreateWorkstationForm";
import UpdateWorkstationForm from "./Partials/UpdateWorkstationForm";
import DeleteWorkstationForm from "./Partials/DeleteWorstationForm";
import axios from "axios";

export default function Index({ customerAuth, application, workstations, GlobalTranslations, translations }) {

    const defaultWorkstationId = application.cr_workstations.find((workstation) => workstation.name === 'Pending assignements')?.id || null;

    const [updatedWorkstations, setUpdatedWorkstations] = useState(workstations);

    useEffect(() => {
        setUpdatedWorkstations(workstations);
    }, [workstations]);

    const onDragEnd = async (result) => {
        const { destination, source } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const sourceWorkstationId = parseInt(source.droppableId.split('-')[1]);
        const destinationWorkstationId = parseInt(destination.droppableId.split('-')[1]);

        const sourceWorkstation = updatedWorkstations.find((workstation) => workstation.id === sourceWorkstationId);
        const destinationWorkstation = updatedWorkstations.find((workstation) => workstation.id === destinationWorkstationId);

        const movedEmployee = sourceWorkstation.cr_employees[source.index];

        if (sourceWorkstation === destinationWorkstation) {
            return;
        } else {
            sourceWorkstation.cr_employees.splice(source.index, 1);
            destinationWorkstation.cr_employees.splice(destination.index, 0, movedEmployee);
        }

        await axios.patch(route('employees.updateDragAndDrop'), {
            workstations: updatedWorkstations,
        })
            .then(function (response) {
                setUpdatedWorkstations(response.data.workstations);
            })
            .catch(function (error) { });
    };

    return (
        <CR_AppAdminLayout
            auth={customerAuth}
            application={application}
            GlobalTranslations={GlobalTranslations}
        >
            <Head title={application.name} />
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow-md rounded-lg transition ease-linear duration-300">
                    <CreateWorkstationForm className="max-w-xl mx-auto" application={application} translations={translations} />
                </div>
                {updatedWorkstations.length > 1 ? (
                    <ul className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-4">
                        {updatedWorkstations.slice(1).map((workstation) => (
                            <li className="flex flex-col sm:p-8 p-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-md rounded-lg transition ease-linear duration-300" key={workstation.id}>
                                <div className="flex items-center justify-between pb-4 border-b border-gray-300 dark:border-gray-700 drop-shadow-sm dark:drop-shadow-none">
                                    <h3>{workstation.name}</h3>
                                    <div className="flex gap-2">
                                        <UpdateWorkstationForm workstation={workstation} translations={translations} />
                                        <DeleteWorkstationForm workstation={workstation} translations={translations} />
                                    </div>
                                </div>
                                <DragDropContext onDragEnd={onDragEnd}>
                                    <div className="flex h-full mt-4 gap-2">
                                        <div className="flex flex-col w-1/2 h-full">
                                            <h4 className="text-center underline">{translations.listEmployeeTitle}</h4>
                                            <Droppable droppableId={`workstation-${workstation.id}`}>
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
                                            <h4 className="text-center underline">{translations.listEmployeeFreeTitle}</h4>
                                            <Droppable droppableId={`workstation-${defaultWorkstationId}`}>
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
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="p-4 sm:p-8 text-center bg-white dark:bg-gray-800 shadow sm:rounded-lg transition ease-linear duration-300">
                        <p className='text-gray-900 dark:text-gray-100'>{translations.noWorkstationFound}</p>
                    </div>
                )}
            </div>
        </CR_AppAdminLayout>
    )
}
