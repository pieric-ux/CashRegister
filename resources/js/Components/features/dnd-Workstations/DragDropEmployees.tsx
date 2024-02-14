import axios from 'axios';
import { usePage, router } from '@inertiajs/react';
import DroppableGeneric from './DroppableGeneric';
import { DraggableGeneric } from './DraggableGeneric';
import { type Product } from '@/Shared/Types/ProductTypes';
import { type Employee } from '@/Shared/Types/EmployeeTypes';
import { type Workstation } from '@/Shared/Types/WorkstationTypes';
import { type CashRegister } from '@/Shared/Types/CashRegisterTypes';
import { DragDropContext, type DropResult } from 'react-beautiful-dnd';

interface PageProps extends InertiaPageProps {
    cashRegisterModule: CashRegister & {
        cr_workstations: Workstation[] & {
            cr_employees: Employee[];
            cr_products: Product[];
            generalProducts: Product[];
        };
    };
}

interface DragDropEmployeesProps {
    workstation: Workstation & {
        cr_employees: Employee[];
        cr_products: Product[];
        generalProducts: Product[];
    };
}

export default function DragDropEmployees({ workstation }: DragDropEmployeesProps): JSX.Element {
    const { cashRegisterModule } = usePage<PageProps>().props;

    const workstations = cashRegisterModule.cr_workstations;

    const updatedWorkstations = workstations.map((ws) => ({ ...ws })) as (Workstation & {
        cr_employees: Employee[];
        cr_products: Product[];
        generalProducts: Product[];
    })[];

    const defaultWorkstation = updatedWorkstations.find(
        (workstation) => workstation.name === 'Pending assignement',
    );

    const onDragEnd = async (result: DropResult): Promise<void> => {
        const { destination, source } = result;

        if (!destination || destination.droppableId === source.droppableId) {
            return;
        }

        const sourceId = parseInt(source.droppableId.split('-')[1]);
        const destinationId = parseInt(destination.droppableId.split('-')[1]);

        const sourceWorkstation = updatedWorkstations.find(
            (workstation) => workstation.id === sourceId,
        );
        const destinationWorkstation = updatedWorkstations.find(
            (workstation) => workstation.id === destinationId,
        );

        const movedEmployee = sourceWorkstation?.cr_employees[source.index];

        if (movedEmployee) {
            sourceWorkstation?.cr_employees.splice(source.index, 1);
            destinationWorkstation?.cr_employees.splice(destination.index, 0, movedEmployee);
        }

        await axios.patch(route('employees.updateDragAndDrop'), {
            workstations: updatedWorkstations,
        });

        router.reload();
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className='mt-4 flex gap-2'>
                <DroppableGeneric
                    droppableId={`workstation-${workstation.id}-employees`}
                    droppableTitle='Employee'
                    datas={workstation.cr_employees}
                >
                    {(data, index) => (
                        <DraggableGeneric key={data.id} data={data} index={index}>
                            <p>{(data as Employee).first_name}</p>
                            <p>{(data as Employee).last_name.charAt(0)}.</p>
                        </DraggableGeneric>
                    )}
                </DroppableGeneric>

                <div className='border-r border-gray-300 dark:border-gray-700'></div>

                {defaultWorkstation && (
                    <DroppableGeneric
                        droppableId={`workstation-${defaultWorkstation.id}-employees`}
                        droppableTitle='Employee Free'
                        datas={defaultWorkstation.cr_employees}
                    >
                        {(data, index) => (
                            <DraggableGeneric key={data.id} data={data} index={index}>
                                <p>{(data as Employee).first_name}</p>
                                <p>{(data as Employee).last_name.charAt(0)}.</p>
                            </DraggableGeneric>
                        )}
                    </DroppableGeneric>
                )}
            </div>
        </DragDropContext>
    );
}
