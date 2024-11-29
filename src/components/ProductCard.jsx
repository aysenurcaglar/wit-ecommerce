import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useHistory } from "react-router-dom";
import createSlug from "../utils/createSlug";
import { ShoppingCart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addToCart } from "../store/actions/shoppingCartActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const ProductCard = ({ product, category }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    console.log("Clicked product:", product.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
    history.push(
      `/shop/${category.gender === "k" ? "kadin" : "erkek"}/${createSlug(
        category.title
      )}/${category.id}/${createSlug(product.name)}/${product.id}`
    );
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    // To prevent triggering card click
    e.stopPropagation();
    if (product) {
      dispatch(addToCart(product));
      // Show some feedback to user
      toast.success(`${product.name} added to your cart`, {
        position: "bottom-right",
      });
    }
  };

  return (
    <Card
      className="border-slate-200 shadow-none overflow-hidden transition-all hover:scale-105 cursor-pointer"
      onClick={handleClick}
    >
      <CardContent className="p-0">
        <div className="aspect-[3/4] mb-4">
          <img
            src={product.images[0].url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="px-2">
          <div className="mb-3">
            <h3 className="font-bold text-base mb-2">{product.name}</h3>
            <span className="text-secondary-color font-bold">
              ${product.price.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-center items-center gap-2 mt-2 mb-4">
            <Button
              variant="outline"
              size="icon"
              className="p-4"
              label="Add to cart"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="p-4"
              label="View product"
              onClick={handleClick}
            >
              <Eye className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
