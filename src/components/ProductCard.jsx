import React from 'react';

const ProductCard = ({ title, price, image }) => {
  return (
    <div className="m-4">
      <img src={image} alt={title} className="w-full h-full object-contain" />
      <h3 className="font-bold">{title}</h3>
      <p className="text-gray-600 mb-4">${price}</p>
      
      
    </div>
  );
};

export default ProductCard;
