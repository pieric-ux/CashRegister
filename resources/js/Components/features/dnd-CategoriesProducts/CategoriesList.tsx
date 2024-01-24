import { type DroppableProvided } from 'react-beautiful-dnd';
import { type CategoryProducts } from '@/Shared/Types/CategoryProductsTypes';
import DraggableCategory from '@/Components/features/dnd-CategoriesProducts/DraggableCategory';

export default function CategoriesList({
    categories,
    provided,
}: {
    categories: CategoryProducts[];
    provided: DroppableProvided;
}): JSX.Element {
    return (
        <ul
            className='mt-4 grid grid-cols-1 gap-4'
            ref={provided.innerRef}
            {...provided.droppableProps}
        >
            {categories.slice(1).map((category, index) => (
                <DraggableCategory key={category.id} category={category} index={index} />
            ))}
            {provided.placeholder}
        </ul>
    );
}
