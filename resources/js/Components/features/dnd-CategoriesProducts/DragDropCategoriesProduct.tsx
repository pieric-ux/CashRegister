import axios from 'axios';
import { type CategoryProducts } from '@/Shared/Types/CategoryProductsTypes';
import { DragDropContext, Droppable, type DropResult } from 'react-beautiful-dnd';
import CategoriesList from '@/Components/features/dnd-CategoriesProducts/CategoriesList';

export default function DragDropCategoriesProduct({
    categoriesProducts,
}: {
    categoriesProducts: CategoryProducts[];
}): JSX.Element {
    const onDragEnd = async (result: DropResult): Promise<void> => {
        const { destination, source } = result;
        const categories = categoriesProducts;

        if (
            destination === null ||
            destination === undefined ||
            destination.index === source.index
        ) {
            return;
        }

        const movedCategory = categories.splice(source.index, 1)[0];
        categories.splice(destination.index, 0, movedCategory);

        const categoriesWithNewOrder = categories.map((category, index) => {
            return {
                ...category,
                order: index,
            };
        });

        await axios.patch(route('categories.updateDragAndDrop'), {
            categories: categoriesWithNewOrder,
        });
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='categories'>
                {(provided) => (
                    <CategoriesList categories={categoriesProducts} provided={provided} />
                )}
            </Droppable>
        </DragDropContext>
    );
}
