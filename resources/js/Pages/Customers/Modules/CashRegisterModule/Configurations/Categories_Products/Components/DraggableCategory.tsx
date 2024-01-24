import { Draggable } from 'react-beautiful-dnd';
import UpdateCategoriesProduct from './UpdateCategoriesProduct';
import DeleteCategoriesProduct from './DeleteCategoriesProduct';
import { Card, CardHeader, CardTitle } from '@/Components/ui/card/card';
import { type CategoryProducts } from '@/Shared/Types/CategoryProductsTypes';

export default function DraggableCategory({
    category,
    index,
}: {
    category: CategoryProducts;
    index: number;
}): JSX.Element {
    return (
        <Draggable key={category.id} draggableId={category.name} index={index + 1}>
            {(provided) => (
                <Card
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <CardHeader variant={'flex-row'} className='items-center justify-between'>
                        <CardTitle>{category.name}</CardTitle>
                        <div className='flex gap-2'>
                            <UpdateCategoriesProduct category={category} />
                            <DeleteCategoriesProduct category={category} />
                        </div>
                    </CardHeader>
                </Card>
            )}
        </Draggable>
    );
}
