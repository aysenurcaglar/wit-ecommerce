import ProductCard from "./ProductCard";
import { useSelector, useDispatch } from "react-redux";
import {selectProductsWithCategories} from "../store/selectors/selectProductsWithCategories";


const BestsellerProducts = () => {

  const productList = useSelector((state) => state.product.productList || []);
  const categories = useSelector((state) => state.product.categories || []);

  const productsWithCategories = selectProductsWithCategories(productList, categories);

  const bestsellerList = productsWithCategories
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8);

  // Function to find the category for a given product
  const findCategory = (product) => {
    return categories.find((category) => category.id === product.category_id);
  };

  return (
    <section className="pb-8 md:pb-12 px-4 max-w-[85vw] md:max-w-75vw mx-auto bg-gray-100 object-contain">
      <h2 className="text-xl md:text-2xl font-bold text-dark-gray text-center mb-4">
        BESTSELLER PRODUCTS
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
      {bestsellerList.map((product) => (
          <ProductCard key={product.id} product={product} category={product.category} />
        ))}
      </div>
    </section>
  );
};

export default BestsellerProducts;
