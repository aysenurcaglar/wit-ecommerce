import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";

const BestsellerProducts = ({ featuredProducts }) => {
  const {productList} = useSelector((state) => state.product);

  const list = productList.sort((a, b) => b.rating - a.rating).slice(0, 8);

  return (
    <section className="pb-8 md:pb-12 px-4 max-w-[85vw] md:max-w-75vw mx-auto bg-gray-100 object-contain">
      <h2 className="text-xl md:text-2xl font-bold text-dark-gray text-center mb-4">
        BESTSELLER PRODUCTS
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
        {list.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default BestsellerProducts;
