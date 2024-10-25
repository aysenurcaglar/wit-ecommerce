import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

const Hero2 = () => {
  return (
    <section className="bg-gray-100 w-full overflow-hidden">
      <Swiper
        spaceBetween={0}
        navigation={true}
        modules={[Navigation]}
        className="max-w-full"
      >
        <SwiperSlide>
          <div className="relative flex items-center justify-center w-full overflow-hidden">
            <img
              src="shop-hero-2-product-slide-2.jpg"
              alt="New Arrivals"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center mr-64 p-6">
              <div className="text-white text-left">
                <p className="my-4 md:my-8 text-lg md:text-xl">SUMMER 2024</p>
                <h1 className="text-3xl md:text-6xl font-bold max-w-md">Vita Classic Product</h1>
                <p className="my-4 md:my-8 text-sm md:text-base">
                  We know how large objects will act, <br />
                  but things on a small scale.
                </p>
                <button className="px-3 py-3 md:px-8 md:py-6 bg-success-color text-white text-xl font-bold rounded-lg">
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative flex items-center justify-center w-full overflow-hidden">
            <img
              src="shop-hero-2-product-slide-2.jpg"
              alt="New Arrivals"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center mr-64 p-6">
              <div className="text-white text-left">
                <p className="my-4 md:my-8 text-lg md:text-xl">SUMMER 2024</p>
                <h1 className="text-3xl md:text-6xl font-bold max-w-md">Vita Classic Product</h1>
                <p className="my-4 md:my-8 text-sm md:text-base">
                  We know how large objects will act, <br />
                  but things on a small scale.
                </p>
                <button className="px-3 py-3 md:px-8 md:py-6 bg-success-color text-white text-xl font-bold rounded-lg">
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Hero2;
