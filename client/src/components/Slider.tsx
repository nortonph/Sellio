import { useNavigate } from 'react-router-dom';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function Slider() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/item');
  };

  return (
    <div className="w-full relative">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={5}
        slidesPerView={1}
        navigation
        pagination={{ clickable: false }}
        onSlideChange={() => console.log('slide change')}
      >
        <SwiperSlide>
          <div className="relative">
            <img
              src="https://i.ebayimg.com/images/g/cHQAAOSwEGlnfwEN/s-l1600.webp"
              alt="Slide 1"
              className="w-full h-80 rounded-lg shadow-lg object-cover"
            />
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2 text-green-900 px-8 py-3 mx-10">
              <h3 className="text-6xl font-bold">Wooden bed flower</h3>
            </div>
            <div className="absolute bottom-2 left-14 transform -translate-y-1/2 rounded-full  bg-green-900 text-white px-8 py-3 mx-10">
              
              <button onClick={handleButtonClick} >
                <h3 className="text-2xl font-bold">Buy Now</h3>
              </button>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative">
            <img
              src="https://i.ebayimg.com/images/g/s80AAOSwbOtmKEfy/s-l1600.webp"
              alt="Slide 2"
              className="w-full h-80 rounded-lg shadow-lg object-cover"
            />
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2 text-green-900 px-8 py-3 mx-10">
              <h3 className="text-6xl font-bold">Wooden bed flower</h3>
            </div>
            <div className="absolute bottom-2 left-14 transform -translate-y-1/2 rounded-full  bg-green-900 text-white px-8 py-3 mx-10">
              <button onClick={handleButtonClick} >
                  <h3 className="text-2xl font-bold">Buy Now</h3>
              </button>
            </div>
          </div>
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
