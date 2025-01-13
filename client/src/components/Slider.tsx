import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function Slider() {
  return (
    <div className="w-full relative">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: false }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        <SwiperSlide>
          <img
            src="https://i.ebayimg.com/images/g/cHQAAOSwEGlnfwEN/s-l1600.webp"
            alt="Slide 1"
            className="w-full h-80 rounded-lg shadow-lg object-cover"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src="https://i.ebayimg.com/images/g/s80AAOSwbOtmKEfy/s-l1600.webp"
            alt="Slide 2"
            className="w-full h-80 rounded-lg shadow-lg object-cover"
          />
        </SwiperSlide>
      </Swiper>

      {/* Add custom CSS to change arrow and pagination colors */}
      <style jsx>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: white; /* Change arrow color to white */
        }

        .swiper-pagination-bullet {
          background-color: white; /* Change pagination bullet color to white */
          opacity: 0.6; /* Optional: Set opacity for inactive bullets */
        }

        .swiper-pagination-bullet-active {
          opacity: 1; /* Make active bullet fully visible */
        }
      `}</style>
    </div>
  );
}

export default Slider;
