// Import the Pagination module from the Swiper library
import { Pagination } from "swiper/modules";

// Configuration object for Swiper
export const swiperSetting = {
    // Include the Pagination module in the Swiper instance
    modules: [Pagination],

    // Pagination settings
    pagination: {
        el: ".swiper-pagination", // The element to render pagination
        type: "progressbar", // Type of pagination: progressbar
        renderProgressbar: function (progressbarFillClass) {
            // Custom rendering of the progress bar
            return (
                '<span class="' + progressbarFillClass + ' !bg-sky-500"></span>'
            );
        },
    },

    // Breakpoints settings for responsive design
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
