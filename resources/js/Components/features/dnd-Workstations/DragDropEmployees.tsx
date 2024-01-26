import axios from 'axios';
import { useContext } from 'react';
import DroppableGeneric from './DroppableGeneric';
import { DraggableGeneric } from './DraggableGeneric';
import { type Workstation } from '@/Shared/Types/WorkstationTypes';
import { DragDropContext, type DropResult } from 'react-beautiful-dnd';
import { CashRegisterConfigurationsContext } from '@/Context/CashRegisterModulesContext';

export default function DragDropEmployees({
    workstation,
}: {
    workstation: Workstation;
}): JSX.Element {
    const { cashRegisterModule } = useContext(CashRegisterConfigurationsContext);
    const workstations = cashRegisterModule?.cr_workstations;

    const defaultWorkstation = workstations?.find(
        (workstation) => workstation.name === 'Pending assignement',
    );

    const onDragEnd = async (result: DropResult): Promise<void> => {
        const { destination, source } = result;

        if (
            destination === null ||
            destination === undefined ||
            destination.droppableId === source.droppableId
        ) {
            return;
        }
        const sourceId = parseInt(source.droppableId.split('-')[1]);
        const destinationId = parseInt(destination.droppableId.split('-')[1]);

        const sourceWorkstation = workstations?.find((workstation) => workstation.id === sourceId);
        const destinationWorkstation = workstations?.find(
            (workstation) => workstation.id === destinationId,
        );

        const movedEmployee = sourceWorkstation?.cr_employees[source.index];

        sourceWorkstation?.cr_employees.splice(source.index, 1);
        destinationWorkstation?.cr_employees.splice(destination.index, 0, movedEmployee);

        await axios.patch(route('employees.updateDragAndDrop'), {
            workstations,
        });
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
                            <p>{data.first_name}</p>
                            <p>{data.last_name.charAt(0)}.</p>
                        </DraggableGeneric>
                    )}
                </DroppableGeneric>

                <div className='border-r border-gray-300 dark:border-gray-700'></div>

                <DroppableGeneric
                    droppableId={`workstation-${defaultWorkstation.id}-employees`}
                    droppableTitle='Employee Free'
                    datas={defaultWorkstation.cr_employees}
                >
                    {(data, index) => (
                        <DraggableGeneric key={data.id} data={data} index={index}>
                            <p>{data.first_name}</p>
                            <p>{data.last_name.charAt(0)}.</p>
                        </DraggableGeneric>
                    )}
                </DroppableGeneric>
            </div>
        </DragDropContext>
    );
}
