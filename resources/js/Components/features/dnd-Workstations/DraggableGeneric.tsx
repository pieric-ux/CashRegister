import clsx from 'clsx';
import { type ReactNode } from 'react';
import { Draggable } from 'react-beautiful-dnd';

interface DraggableGenericProps<T> {
    data: T;
    index: number;
    children: ReactNode;
}

export function DraggableGeneric<T>({
    data,
    index,
    children,
}: DraggableGenericProps<T>): JSX.Element {
    return (
        <Draggable draggableId={`${data.id}`} index={index}>
            {(provided, snapshot) => (
                <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    key={data.id}
                    className={clsx(
                        'rounded-md border-2 border-ring p-1 shadow-sm transition duration-300 ease-linear',
                        'hover:bg-foreground/10 hover:duration-150',
                        {
                            'bg-ring': snapshot.isDragging,
                        },
                    )}
                >
                    <div className='flex items-center justify-center gap-2 overflow-auto'>
                        {children}
                    </div>
                </li>
            )}
        </Draggable>
    );
}
