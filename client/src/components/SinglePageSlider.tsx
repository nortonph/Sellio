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

        <SwiperSlide>
          <img
            src="https://i.ebayimg.com/images/g/SnEAAOSw~O5mj9bc/s-l1600.webp"
            alt="Thumbnail 1"
            className="w-20 h-20 object-cover rounded-lg border border-gray-300 cursor-pointer"
          />
        </SwiperSlide>
        
        <SwiperSlide>
          <img
            src="https://i.ebayimg.com/images/g/elUAAOSwPZBmj9d6/s-l1600.webp"
            alt="Thumbnail 2"
            className="w-20 h-20 object-cover rounded-lg border border-gray-300 cursor-pointer"
          />
        </SwiperSlide>
        
        <SwiperSlide>
          <img
            src="https://i.ebayimg.com/images/g/n78AAOSweoVmj9co/s-l1600.webp"
            alt="Thumbnail 3"
            className="w-20 h-20 object-cover rounded-lg border border-gray-300 cursor-pointer"
          />
        </SwiperSlide>
        
        <SwiperSlide>
          <img
            src="https://i.ebayimg.com/images/g/KzQAAOSwAIRmj9dx/s-l1600.webp"
            alt="Thumbnail 4"
            className="w-20 h-20 object-cover rounded-lg border border-gray-300 cursor-pointer"
          />
        </SwiperSlide>
        
        <SwiperSlide>
          <img
            src="https://i.ebayimg.com/images/g/SnEAAOSw~O5mj9bc/s-l1600.webp"
            alt="Thumbnail 5"
            className="w-20 h-20 object-cover rounded-lg border border-gray-300 cursor-pointer"
          />
        </SwiperSlide>
        
        <SwiperSlide>
          <img
            src="https://i.ebayimg.com/images/g/elUAAOSwPZBmj9d6/s-l1600.webp"
            alt="Thumbnail 6"
            className="w-20 h-20 object-cover rounded-lg border border-gray-300 cursor-pointer"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src="https://i.ebayimg.com/images/g/SnEAAOSw~O5mj9bc/s-l1600.webp"
            alt="Thumbnail 1"
            className="w-20 h-20 object-cover rounded-lg border border-gray-300 cursor-pointer"
          />
        </SwiperSlide>
        
        <SwiperSlide>
          <img
            src="https://i.ebayimg.com/images/g/elUAAOSwPZBmj9d6/s-l1600.webp"
            alt="Thumbnail 2"
            className="w-20 h-20 object-cover rounded-lg border border-gray-300 cursor-pointer"
          />
        </SwiperSlide>
        
        <SwiperSlide>
          <img
            src="https://i.ebayimg.com/images/g/n78AAOSweoVmj9co/s-l1600.webp"
            alt="Thumbnail 3"
            className="w-20 h-20 object-cover rounded-lg border border-gray-300 cursor-pointer"
          />
        </SwiperSlide>
        
        <SwiperSlide>
          <img
            src="https://i.ebayimg.com/images/g/KzQAAOSwAIRmj9dx/s-l1600.webp"
            alt="Thumbnail 4"
            className="w-20 h-20 object-cover rounded-lg border border-gray-300 cursor-pointer"
          />
        </SwiperSlide>
        
        <SwiperSlide>
          <img
            src="https://i.ebayimg.com/images/g/SnEAAOSw~O5mj9bc/s-l1600.webp"
            alt="Thumbnail 5"
            className="w-20 h-20 object-cover rounded-lg border border-gray-300 cursor-pointer"
          />
        </SwiperSlide>
        
        <SwiperSlide>
          <img
            src="https://i.ebayimg.com/images/g/elUAAOSwPZBmj9d6/s-l1600.webp"
            alt="Thumbnail 6"
            className="w-20 h-20 object-cover rounded-lg border border-gray-300 cursor-pointer"
          />
        </SwiperSlide>

      </Swiper>
      
    </div>
  );
}

export default Slider;
