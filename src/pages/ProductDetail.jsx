import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingCart } from "lucide-react";

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
    <div className="max-w-[85vw] md:max-w-75vw mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="overflow-hidden rounded-lg">
          <img
            src={`/${product.image}`}
            alt={product.name}
            className="object-none"
          />
        </div>

        {/* Product Info */}
        <Card className="border-none shadow-none">
          <CardContent className="p-6">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-500 mb-4">{product.brand}</p>
            
            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-2xl font-bold text-secondary-color">
                ${product.price}
              </span>
              <span className="text-lg text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            </div>

            {/* Colors */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Available Colors</h3>
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
              <h3 className="text-sm font-medium mb-2">Quantity</h3>
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

            {/* Add to Cart Button */}
            <Button className="w-full mb-6" size="lg">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Description</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>

            {/* Details 
            <div>
              <h3 className="text-lg font-medium mb-2">Product Details</h3>
              <ul className="list-disc list-inside text-gray-600">
                {product.details.map((detail, index) => (
                  <li key={index} className="mb-1">{detail}</li>
                ))}
              </ul>
            </div>
            */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetail;