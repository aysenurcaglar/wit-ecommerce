import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="bg-gray-100 w-full overflow-hidden">
      <Swiper
        spaceBetween={0}
        navigation={true}
        modules={[Navigation]}
        className="max-w-full"
      >
        <SwiperSlide>
          <div className="relative flex items-center justify-center w-full overflow-hidden min-h-[700px]">
            <img
              src="shop-hero-1-product-slide-1.jpg"
              alt="New Arrivals"
              className="w-full h-full object-none object-right absolute inset-0"
            />
            <div className="absolute inset-0 flex items-center justify-center md:max-w-75vw mx-auto md:justify-start md:ml-24">
              <div className="text-white text-center md:text-left max-w-[85vw] md:max-w-75vw px-4 md:px-0">
                <p className="font-bold my-4 md:my-8 text-base md:text-xl">
                  SUMMER 2024
                </p>
                <h1 className="text-2xl md:text-6xl font-bold max-w-md">
                  NEW COLLECTION
                </h1>
                <p className="my-4 md:my-8 text-sm md:text-base max-w-md">
                  We know how large objects will act, <br />
                  but things on a small scale.
                </p>
                <Button variant="secondary" size="lg">SHOP NOW</Button>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative flex items-center justify-center w-full overflow-hidden min-h-[400px] md:min-h-[700px]">
            <img
              src="shop-hero-1-product-slide-1.jpg"
              alt="New Arrivals"
              className="w-full h-full object-cover absolute inset-0"
            />
            <div className="absolute inset-0 flex items-center justify-center md:justify-start md:ml-24">
              <div className="text-white text-center md:text-left px-4 md:px-0">
                <p className="font-bold my-4 md:my-8 text-base md:text-xl">
                  SUMMER 2024
                </p>
                <h1 className="text-2xl md:text-6xl font-bold max-w-md">
                  NEW COLLECTION
                </h1>
                <p className="my-4 md:my-8 text-sm md:text-base max-w-md">
                  We know how large objects will act, <br />
                  but things on a small scale.
                </p>
                <Button variant="secondary" size="lg">SHOP NOW</Button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Hero;
