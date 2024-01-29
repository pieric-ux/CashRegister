import { Draggable } from 'react-beautiful-dnd';
import { Card, CardHeader, CardTitle } from '@/Components/ui/card/card';
import { type CategoryProducts } from '@/Shared/Types/CategoryProductsTypes';
import UpdateCategoriesProduct from '@/Pages/Customers/Modules/CashRegisterModule/Configurations/Categories_Products/Components/UpdateCategoriesProduct';
import DeleteCategoriesProduct from '@/Pages/Customers/Modules/CashRegisterModule/Configurations/Categories_Products/Components/DeleteCategoriesProduct';

interface DraggableCategoryProps {
    category: CategoryProducts;
    index: number;
}

export default function DraggableCategory({
    category,
    index,
}: DraggableCategoryProps): JSX.Element {
    return (
        <Draggable draggableId={category.name} index={index + 1}>
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
