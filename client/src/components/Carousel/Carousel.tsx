// src/Carousel.tsx
import React, { useEffect } from "react";
import Swiper from "swiper";
// import { Navigation, Pagination, Scrollbar } from "swiper/modules";
// Import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// Types
import { SwiperOptions } from "swiper/types";

const swiperParams: SwiperOptions = {
  slidesPerView: 3,
  spaceBetween: 50,
  direction: "vertical",
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  scrollbar: {
    el: ".swiper-scrollbar",
  },
  freeMode: {
    enabled: true,
  },
  autoplay: {
    delay: 5000,
  },
  parallax: { enabled: true },
  height: 400,
};

const Carousel: React.FC = () => {
  useEffect(() => {
    const swiper = new Swiper(".swiper", swiperParams);

    return () => {
      swiper.destroy(); // Clean up on component unmount
    };
  }, []);

  return (
    <div>
      <div className='swiper'>
        <div className='swiper-wrapper'>
          <div className='swiper-slide'>
            <h4 data-swiper-parallax='-100'>Slide 1</h4>
          </div>
          <div className='swiper-slide'>
            <h4 data-swiper-parallax='-100'>Slide 2</h4>
          </div>
          <div className='swiper-slide'>
            <h4 data-swiper-parallax='-100'>Slide 3</h4>
          </div>
          {/* Add more slides as needed */}
          <div className='swiper-slide'>
            <h4 data-swiper-parallax='-100'>Slide 4</h4>
          </div>
          <div className='swiper-slide'>
            <h4 data-swiper-parallax='-100'>Slide 5</h4>
          </div>
        </div>

        <div className='swiper-pagination'></div>
        <div className='swiper-button-prev'></div>
        <div className='swiper-button-next'></div>
        <div className='swiper-scrollbar'></div>
      </div>
    </div>
  );
};

export default Carousel;
