import Hero from "../components/Hero";
import EditorsPick from "../components/EditorsPick";
import Hero2 from "../components/Hero2";
import FeaturedPosts from "../components/FeaturedPosts";
import BestsellerProducts from "../components/BestsellerProducts";

const HomePage = ({ featuredProducts }) => {
  return (
    <div className="w-screen">
      <Hero />
      <EditorsPick />
      <h2 className="text-xl md:text-2xl font-semibold text-light-gray text-center mb-2">
        Featured Products
      </h2>
      <BestsellerProducts featuredProducts={featuredProducts} />
      <Hero2 />
      <FeaturedPosts />
    </div>
  );
};

export default HomePage;
