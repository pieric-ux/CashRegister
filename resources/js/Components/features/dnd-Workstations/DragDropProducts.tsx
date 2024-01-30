import axios from 'axios';
import { useContext } from 'react';
import DroppableGeneric from './DroppableGeneric';
import { DraggableGeneric } from './DraggableGeneric';
import { type Workstation } from '@/Shared/Types/WorkstationTypes';
import { DragDropContext, type DropResult } from 'react-beautiful-dnd';
import { CashRegisterConfigurationsContext } from '@/Context/CashRegisterModulesContext';

interface DragDropProductsProps {
    workstation: Workstation;
}

export default function DragDropProducts({ workstation }: DragDropProductsProps): JSX.Element {
    const { cashRegisterModule, setCashRegisterModule } = useContext(
        CashRegisterConfigurationsContext,
    );
    const workstations = cashRegisterModule?.cr_workstations;
    const updatedWorkstations = [...workstations];

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

        const sourceWorkstation = updatedWorkstations?.find(
            (workstation) => workstation.id === sourceId,
        );
        const destinationWorkstation = updatedWorkstations?.find(
            (workstation) => workstation.id === destinationId,
        );

        const sourceProducts =
            sourceId === 0
                ? destinationWorkstation?.generalProducts
                : sourceWorkstation?.cr_products;

        const movedProduct = sourceProducts[source.index];

        if (sourceId === 0) {
            destinationWorkstation?.cr_products.splice(destination.index, 0, movedProduct);
            destinationWorkstation?.generalProducts.splice(source.index, 1);
        } else {
            sourceWorkstation?.generalProducts.splice(destination.index, 0, movedProduct);
            sourceWorkstation?.cr_products.splice(source.index, 1);
        }

        setCashRegisterModule({
            ...cashRegisterModule,
            cr_workstations: updatedWorkstations,
        });

        await axios.patch(route('products.updateDragAndDrop'), {
            workstations: updatedWorkstations,
        });
    };
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className='mt-4 flex gap-2'>
                <DroppableGeneric
                    droppableId={`workstation-${workstation.id}-products`}
                    droppableTitle='Products'
                    datas={workstation.cr_products}
                >
                    {(data, index) => (
                        <DraggableGeneric key={data.id} data={data} index={index}>
                            <p>{data.name}</p>
                            <p>{data.unit}.</p>
                        </DraggableGeneric>
                    )}
                </DroppableGeneric>

                <div className='border-r border-gray-300 dark:border-gray-700'></div>

                <DroppableGeneric
                    droppableId={`products-0`}
                    droppableTitle='Products'
                    datas={workstation.generalProducts}
                >
                    {(data, index) => (
                        <DraggableGeneric key={data.id} data={data} index={index}>
                            <p>{data.name}</p>
                            <p>{data.unit}.</p>
                        </DraggableGeneric>
                    )}
                </DroppableGeneric>
            </div>
        </DragDropContext>
    );
}
