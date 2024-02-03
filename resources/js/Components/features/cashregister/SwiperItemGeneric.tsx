import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { swiperSetting } from '@/Config/swiperConfig';
import ButtonItemGeneric from './ButtonItemGeneric';

interface SwiperItemProps<T> {
    datas: T[] | Map<number | undefined, T>;
    itemType: string;
}

export default function SwiperItemGeneric<T>({ datas, itemType }: SwiperItemProps<T>): JSX.Element {
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
