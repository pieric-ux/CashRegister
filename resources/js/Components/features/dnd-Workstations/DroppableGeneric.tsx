import clsx from 'clsx';
import { type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Droppable } from 'react-beautiful-dnd';
import { type Product } from '@/Shared/Types/ProductTypes';
import { type Employee } from '@/Shared/Types/EmployeeTypes';

interface DroppableGenericProps {
    droppableId: string;
    droppableTitle: string;
    datas: Product[] | Employee[];
    children: (data: Product | Employee, index: number) => ReactNode;
}

export default function DroppableGeneric({
    droppableId,
    droppableTitle,
    datas,
    children,
}: DroppableGenericProps): JSX.Element {
    const { t } = useTranslation();
    return (
        <div className='flex w-1/2 flex-col'>
            <h4 className='text-center underline'>{t(droppableTitle)}</h4>
            <Droppable droppableId={`${droppableId}`}>
                {(provided, snapshot) => (
                    <ul
                        className={clsx('mt-2 flex flex-grow flex-col gap-1 p-2', {
                            'rounded-md bg-foreground/10 transition duration-300 ease-linear':
                                snapshot.isDraggingOver,
                        })}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {datas.length > 0 && datas.map((data, index) => children(data, index))}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        </div>
    );
}
