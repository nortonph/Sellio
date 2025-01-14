import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

interface SliderProps {
  images: string[]; // Ensure images is a string array
}

function Slider({ images }: SliderProps) {
  const url = 'http://localhost:3001';

  return (
    <div className="w-full relative">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={10} // Set space between slides
        navigation
        breakpoints={{
          0: { slidesPerView: 1 },
          320: { slidesPerView: 2 },
          480: { slidesPerView: 3 },
          640: { slidesPerView: 4 },
          768: { slidesPerView: 5 },
          1024: { slidesPerView: 6 },
          1280: { slidesPerView: 7 },
          1536: { slidesPerView: 8 },
          1920: { slidesPerView: 10 },
          2560: { slidesPerView: 12 },
          3840: { slidesPerView: 14 },
        }}
      >
        {images?.length > 0 ? (
          images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={`${url}/${image}`}
                alt={`Thumbnail ${index + 1}`}
                className="w-20 h-20 object-cover rounded-lg border border-gray-300 cursor-pointer"
              />
            </SwiperSlide>
          ))
        ) : (
          <div className="text-gray-500">No images available</div>
        )}
      </Swiper>
    </div>
  );
}

export default Slider;
