import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const ProductCard = ({ product }) => {
  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-0">
        <div className="aspect-[3/4] mb-4">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="px-2">
          <h3 className="font-bold text-base mb-2">{product.name}</h3>
          <p className="text-gray-500 text-sm mb-2">{product.brand}</p>
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-light-gray font-bold line-through text-sm">
              ${product.originalPrice}
            </span>
            <span className="text-secondary-color font-bold">
              ${product.price}
            </span>
          </div>
          <div className="flex justify-center gap-2 mb-4">
            {product.colors.map((color, index) => (
              <div
                key={index}
                className="w-4 h-4 rounded-full border border-gray-200"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;