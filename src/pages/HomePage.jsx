import Hero from "../components/Hero";
import EditorsPick from "../components/EditorsPick";
import Hero2 from "../components/Hero2";
import FeaturedPosts from "../components/FeaturedPosts";
import BestsellerProducts from "../components/BestsellerProducts";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <div className="w-screen">
      <Hero />
      <EditorsPick />
      <h2 className="text-xl md:text-2xl font-semibold text-light-gray text-center mb-2">
        Featured Products
      </h2>
      <BestsellerProducts />
      <Hero2 />
      <div className="flex flex-wrap-reverse items-center justify-center xl:justify-between max-w-75vw mx-auto gap-8">
        <img
          src="asian-woman-man-with-winter-clothes 1.png"
          alt="asian woman and man with winter clothes"
        />
        <div className="text-text-color text-center xl:text-left drop-shadow max-w-sm">
          <p className="font-bold my-8 text-base md:text-xl text-light-gray">
            SUMMER 2024
          </p>
          <h1 className="text-2xl md:text-4xl font-bold">
            Part of the Neural Universe
          </h1>
          <p className="my-4 md:my-8 text-sm md:text-base text">
            We know how large objects will act, <br />
            but things on a small scale.
          </p>
          <div className="flex flex-wrap items-center justify-center xl:justify-start gap-4">
            <Button variant="secondary" size="lg">
              BUY NOW
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-success-color text-success-color"
            >
              LEARN MORE
            </Button>
          </div>
        </div>
      </div>
      <FeaturedPosts />
    </div>
  );
};

export default HomePage;
