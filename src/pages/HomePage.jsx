import Hero from "../components/Hero";
import EditorsPick from "../components/EditorsPick";
import ProductCard from "../components/ProductCard";
import Hero2 from "../components/Hero2";
import FeaturedPosts from "../components/FeaturedPosts";
const HomePage = () => {
  const featuredProducts = [
    {
      id: 5,
      name: "Graphic Design",
      brand: "English Department",
      price: 6.48,
      originalPrice: 16.48,
      image: "product-cover-5.jpg",
      colors: ["#23A6F0", "#23856D", "#E77C40", "#E63946"]
  },
  {
      id: 6,
      name: "Graphic Design",
      brand: "English Department",
      price: 6.48,
      originalPrice: 16.48,
      image: "product-cover-6.jpg",
      colors: ["#23A6F0", "#23856D", "#E77C40", "#E63946"]
  },
  {
      id: 7,
      name: "Graphic Design",
      brand: "English Department",
      price: 6.48,
      originalPrice: 16.48,
      image: "product-cover-7.jpg",
      colors: ["#23A6F0", "#23856D", "#E77C40", "#E63946"]
  },
  {
      id: 8,
      name: "Graphic Design",
      brand: "English Department",
      price: 6.48,
      originalPrice: 16.48,
      image: "product-cover-8.jpg",
      colors: ["#23A6F0", "#23856D", "#E77C40", "#E63946"]
  },
  {
      id: 9,
      name: "Graphic Design",
      brand: "English Department",
      price: 6.48,
      originalPrice: 16.48,
      image: "product-cover-9.jpg",
      colors: ["#23A6F0", "#23856D", "#E77C40", "#E63946"]
  },
  {
      id: 10,
      name: "Graphic Design",
      brand: "English Department",
      price: 6.48,
      originalPrice: 16.48,
      image: "product-cover-10.jpg",
      colors: ["#23A6F0", "#23856D", "#E77C40", "#E63946"]
  },
  {
      id: 11,
      name: "Graphic Design",
      brand: "English Department",
      price: 6.48,
      originalPrice: 16.48,
      image: "product-cover-11.jpg",
      colors: ["#23A6F0", "#23856D", "#E77C40", "#E63946"]
  },
  {
      id: 12,
      name: "Graphic Design",
      brand: "English Department",
      price: 6.48,
      originalPrice: 16.48,
      image: "product-cover-12.jpg",
      colors: ["#23A6F0", "#23856D", "#E77C40", "#E63946"]
  },
  ];

  return (
    <div className="w-screen">
      <Hero />
      <EditorsPick />
      {/* Bestseller Products */}
      <section className="py-8 md:py-12 px-4 max-w-[80vw] md:max-w-75vw mx-auto bg-gray-100 object-contain">
        <h2 className="text-xl md:text-2xl font-semibold text-light-gray text-center mb-2">
          Featured Products
        </h2>
        <h2 className="text-xl md:text-2xl font-bold text-dark-gray text-center mb-4">
          BESTSELLER PRODUCTS
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
          {featuredProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <Hero2 />
      <FeaturedPosts />
    </div>
  );
};

export default HomePage;