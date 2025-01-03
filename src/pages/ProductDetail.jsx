import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../store/actions/productActions";
import { useParams, useHistory } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingCart, Heart, Loader2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ChevronRight } from "lucide-react";
import BestsellerProducts from "../components/BestsellerProducts";
import BrandLogos from "../components/BrandLogos";
import StarRating from "../components/StarRating";
import { addToCart } from "../store/actions/shoppingCartActions";
import { toast } from "react-toastify";
import DynamicBreadcrumb from "../components/DynamicBreadcrumb";

const ProductDetail = () => {
  const { productId, gender, categoryId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.product);

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProduct(productId)); // Fetch product data if not already loaded

      console.log("Product detail page", product);
    }
  }, [dispatch, productId]);

  // what the hell is happening here????
  const handleBack = (event) => {
    event.preventDefault();
    console.log("Current scroll position:", window.pageYOffset);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    console.log("Scrolled to top");

    setTimeout(() => {
      history.goBack();
      console.log("Navigated back");
    }, 300);
  };

  if (!product) {
    return (
      <p>
        <Loader2 className="w-4 h-4 inline animate-spin" />
        Loading...
      </p>
    ); // Show a loading state or a spinner
  }

  const handleAddToCart = () => {
    if (product) {
      // Add to cart quantity times
      for (let i = 0; i < quantity; i++) {
        dispatch(addToCart(product));
      }
      // Show some feedback to user
      toast.success(`${quantity} x ${product.name} added to your cart`, {
        position: "bottom-right",
      });
    }
  };

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  return (
    <>
      <div className="max-w-[85vw] md:max-w-75vw mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-around md:justify-between items-center mb-8">
          <DynamicBreadcrumb gender={gender} categoryId={categoryId} />

          <Button
            variant="ghost"
            onClick={handleBack}
            className="inline-flex items-center gap-1 text-md text-primary-color font-semibold"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            Back
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="overflow-hidden rounded-lg max-h-[400px]">
            <img
              src={product.images[0]?.url}
              alt={product.name}
              className=" object-cover object-center"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <StarRating rating={product.rating} />
              <span className="text-lg text-gray-400">{product.rating}</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-secondary-color">
                ${product.price.toFixed(2)}
              </span>
            </div>

            {/* Availability */}
            <div className="flex items-center gap-2 text-sm">
              <h3 className="text-md font-medium">Availability:</h3>
              <h3 className={`text-primary-color font-semibold`}>
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </h3>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-left">{product.description}</p>

            {/* Quantity */}
            <div className="mb-6">
              <h3 className="text-md font-medium text-left mb-4">Quantity</h3>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(-1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-xl font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Button onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button variant="outline" size="icon" className="p-4">
                <Heart className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs
          defaultValue="description"
          className="flex flex-col justify-center items-center mt-8"
        >
          <TabsList className="">
            <TabsTrigger value="description" className="p-2">
              Description
            </TabsTrigger>
            <TabsTrigger value="additional" className="p-2">
              Additional Information
            </TabsTrigger>
            <TabsTrigger value="reviews" className="p-2">
              Reviews
            </TabsTrigger>
          </TabsList>

          <div className="px-4 py-24 h-60 items-center justify-center">
            <TabsContent value="description">
              <p>{product.description}</p>
            </TabsContent>

            <TabsContent value="additional">
              {/* Additional Information content */}
              <p>Additional information goes here...</p>
            </TabsContent>

            <TabsContent value="reviews">
              {/* Reviews content */}
              <p>Customer reviews go here...</p>
            </TabsContent>
          </div>
        </Tabs>

        <BestsellerProducts />
      </div>
      <BrandLogos />
    </>
  );
};

export default ProductDetail;
