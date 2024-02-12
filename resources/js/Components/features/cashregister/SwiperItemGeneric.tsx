import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import ButtonItemGeneric from './ButtonItemGeneric';
import { type Dish } from '@/Shared/Types/DishTypes';
import { swiperSetting } from '@/Config/swiperConfig';
import { type Product } from '@/Shared/Types/ProductTypes';

interface SwiperItemProps {
    datas: Product[] | Dish[];
    itemType: string;
}

export default function SwiperItemGeneric({ datas, itemType }: SwiperItemProps): JSX.Element {
    const [isDragging, setIsDragging] = useState(false);

    const settings = {
        ...swiperSetting,
        onTransitionStart: () => setIsDragging(true),
        onTransitionEnd: () => setIsDragging(false),
        preventClicks: isDragging,
        preventClicksPropagation: isDragging,
    };

    return (
        <Swiper {...settings}>
            {[...datas.values()].map((data) => (
                <SwiperSlide key={data.id} className='pt-4'>
                    <ButtonItemGeneric data={data} isDragging={isDragging} itemType={itemType} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
