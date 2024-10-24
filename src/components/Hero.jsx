import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

const Hero = () => {
    return (
            <section className="bg-gray-100 max-w-screen">
        <Swiper
          spaceBetween={15}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="flex items-center justify-center bg-blue-600 text-white text-left"
            style={{ backgroundImage: "url('shop-hero-1-product-slide-1.jpg')" }}>
              <div className='mr-64 my-52'>
                <p className='font-bold my-8'>SUMMER 2024</p>
                <h1 className="text-4xl font-bold">NEW COLLECTION</h1>
                <p className="my-8">We know how large objects will act, <br />
                but things on a small scale.</p>
                <button className="px-8 py-4 bg-success-color text-white font-bold rounded-lg">SHOP NOW</button>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="flex items-center justify-center bg-blue-600 text-white text-left"
            style={{ backgroundImage: "url('shop-hero-1-product-slide-1.jpg')" }}>
              <div className='mr-64 my-52'>
                <p className='font-bold my-8'>SUMMER 2024</p>
                <h1 className="text-4xl font-bold">NEW COLLECTION</h1>
                <p className="my-8">We know how large objects will act, <br />
                but things on a small scale.</p>
                <button className="px-8 py-4 bg-success-color text-white font-bold rounded-lg">SHOP NOW</button>
              </div>
            </div>
          </SwiperSlide>
          </Swiper>

      </section>
    );
}

export default Hero;