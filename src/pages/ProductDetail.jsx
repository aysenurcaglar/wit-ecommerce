import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingCart, Eye, Star, Heart } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { ChevronRight } from "lucide-react";
import BestsellerProducts from '../components/BestsellerProducts';
import BrandLogos from '../components/BrandLogos';

const ProductDetail = ({ featuredProducts }) => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const product = featuredProducts.find((p) => p.id === parseInt(id));

  if (!product) {
    return <p>Product not found</p>;
  }

  console.log(product);

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  return (
    <>
    <div className="max-w-[85vw] md:max-w-75vw mx-auto px-4 py-8">
      <Breadcrumb className="flex flex-row mb-8">
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="font-bold">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <ChevronRight />
        <BreadcrumbItem>
          <BreadcrumbLink href="/shop">Shop</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="overflow-hidden rounded-lg">
          <img
            src={product.image}
            alt={product.name}
            className="object-none"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>


          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${star <= 4 ? "text-sunburst fill-sunburst" : "text-sunburst"
                    }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">0 Reviews</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-secondary-color">${product.price}</span>
            <span className="text-lg text-dark-gray font-bold line-through mb-4">${product.originalPrice}</span>
          </div>

          {/* Availability */}
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium">Availability:</span>
            <span className="text-primary-color font-semibold">In Stock</span>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-left">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

          {/* Colors */}
          <div className="mb-6">
            <div className="flex gap-3">
              {product.colors.map((color, index) => (
                <button
                  key={index}
                  className="w-8 h-8 rounded-full border-2 border-white ring-2 ring-gray-200 focus:ring-blue-500"
                  style={{ backgroundColor: color }}
                  aria-label={`Color ${index + 1}`}
                />
              ))}
            </div>
          </div>

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
            <Button>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Select Options
            </Button>
            <Button variant="outline" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon">
              <Eye className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="description" className="mt-6">
        <TabsList >
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

        <TabsContent value="description" className="p-4">
          <p>Description goes here...</p>
        </TabsContent>

        <TabsContent value="additional" className="p-4">
          {/* Additional Information content */}
          <p>Additional information goes here...</p>
        </TabsContent>

        <TabsContent value="reviews" className="p-4">
          {/* Reviews content */}
          <p>Customer reviews go here...</p>
        </TabsContent>
      </Tabs>

      <BestsellerProducts featuredProducts={featuredProducts} />

    </div>
    <BrandLogos />
    </>
  );
};

export default ProductDetail;