import { Pagination } from 'swiper/modules';
import { type SwiperOptions } from 'swiper/types';

export const swiperSetting: SwiperOptions = {
    modules: [Pagination],

    pagination: {
        el: '.swiper-pagination',
        type: 'progressbar',
        renderProgressbar: function (progressbarFillClass) {
            return '<span class="' + progressbarFillClass + ' !bg-sky-500"></span>';
        },
    },

    breakpoints: {
        320: {
            slidesPerView: 2,
        },
        375: {
            slidesPerView: 3,
        },
        640: {
            slidesPerView: 4,
        },
        768: {
            slidesPerView: 5,
        },
        1024: {
            slidesPerView: 6,
        },
        1280: {
            slidesPerView: 8,
        },
    },
};
