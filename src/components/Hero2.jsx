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
              {/* Change 1: Added min-height to ensure consistent height on all devices */}
              <div className="relative flex items-center justify-center w-full overflow-hidden min-h-[400px] md:min-h-[700px]">
                {/* Change 2: Made image absolute positioned to properly fill container */}
                <img
                  src="shop-hero-2-product-slide-2.jpg"
                  alt="New Arrivals"
                  className="w-full h-full object-cover absolute inset-0"
                />
                {/* Change 3: Updated positioning and alignment for better mobile display */}
                <div className="absolute inset-0 flex items-center justify-center md:justify-start md:ml-24">
                  {/* Change 4: Improved text container positioning and spacing */}
                  <div className="text-white text-center md:text-left px-4 md:px-0">
                    {/* Change 5: Adjusted text spacing and sizes for mobile */}
                    <p className="font-bold my-4 md:my-8 text-base md:text-xl">
                      SUMMER 2024
                    </p>
                    {/* Change 6: Improved heading size and spacing */}
                    <h1 className="text-2xl md:text-6xl font-bold max-w-md">
                      Vita Classic Product
                    </h1>
                    {/* Change 7: Made paragraph more mobile-friendly */}
                    <p className="my-4 md:my-8 text-sm md:text-base max-w-md">
                      We know how large objects will act, <br />
                      but things on a small scale.
                    </p>
                    {/* Change 8: Adjusted button sizing and padding for better mobile display */}
                    <button className="px-4 py-2 md:px-8 md:py-6 bg-success-color text-white text-lg md:text-xl font-bold rounded-lg">
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              {/* Change 1: Added min-height to ensure consistent height on all devices */}
              <div className="relative flex items-center justify-center w-full overflow-hidden min-h-[400px] md:min-h-[700px]">
                {/* Change 2: Made image absolute positioned to properly fill container */}
                <img
                  src="shop-hero-2-product-slide-2.jpg"
                  alt="New Arrivals"
                  className="w-full h-full object-cover absolute inset-0"
                />
                {/* Change 3: Updated positioning and alignment for better mobile display */}
                <div className="absolute inset-0 flex items-center justify-center md:justify-start md:ml-24">
                  {/* Change 4: Improved text container positioning and spacing */}
                  <div className="text-white text-center md:text-left px-4 md:px-0">
                    {/* Change 5: Adjusted text spacing and sizes for mobile */}
                    <p className="font-bold my-4 md:my-8 text-base md:text-xl">
                      SUMMER 2024
                    </p>
                    {/* Change 6: Improved heading size and spacing */}
                    <h1 className="text-2xl md:text-6xl font-bold max-w-md">
                      Vita Classic Product
                    </h1>
                    {/* Change 7: Made paragraph more mobile-friendly */}
                    <p className="my-4 md:my-8 text-sm md:text-base max-w-md">
                      We know how large objects will act, <br />
                      but things on a small scale.
                    </p>
                    {/* Change 8: Adjusted button sizing and padding for better mobile display */}
                    <button className="px-4 py-2 md:px-8 md:py-6 bg-success-color text-white text-lg md:text-xl font-bold rounded-lg">
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
