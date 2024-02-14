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

interface DragDropProductsProps {
    workstation: Workstation & {
        cr_employees: Employee[];
        cr_products: Product[];
        generalProducts: Product[];
    };
}

export default function DragDropProducts({ workstation }: DragDropProductsProps): JSX.Element {
    const { cashRegisterModule } = usePage<PageProps>().props;

    const workstations = cashRegisterModule.cr_workstations;
    const updatedWorkstations = workstations.map((ws) => ({ ...ws })) as (Workstation & {
        cr_employees: Employee[];
        cr_products: Product[];
        generalProducts: Product[];
    })[];

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

        const sourceProducts =
            sourceId === 0
                ? destinationWorkstation?.generalProducts
                : sourceWorkstation?.cr_products;

        const movedProduct = sourceProducts?.[source.index];

        if (movedProduct) {
            if (sourceId === 0) {
                destinationWorkstation?.cr_products.splice(destination.index, 0, movedProduct);
                destinationWorkstation?.generalProducts.splice(source.index, 1);
            } else {
                sourceWorkstation?.generalProducts.splice(destination.index, 0, movedProduct);
                sourceWorkstation?.cr_products.splice(source.index, 1);
            }
        }

        await axios.patch(route('products.updateDragAndDrop'), {
            workstations: updatedWorkstations,
        });

        router.reload();
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
                            <p>{(data as Product).name}</p>
                            <p>{(data as Product).unit}.</p>
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
                            <p>{(data as Product).name}</p>
                            <p>{(data as Product).unit}.</p>
                        </DraggableGeneric>
                    )}
                </DroppableGeneric>
            </div>
        </DragDropContext>
    );
}
