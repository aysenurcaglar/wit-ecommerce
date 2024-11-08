import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useHistory } from 'react-router-dom';

const ProductCard = ({ product, category }) => {

  const history = useHistory();

  function createSlug(name) {
    const trToEngMap = {
      ç: 'c',
      Ç: 'C',
      ğ: 'g',
      Ğ: 'G',
      ı: 'i',
      İ: 'I',
      ö: 'o',
      Ö: 'O',
      ş: 's',
      Ş: 'S',
      ü: 'u',
      Ü: 'U'
    };
  
    return name
      .split('')
      .map(char => trToEngMap[char] || char) // Replace Turkish chars
      .join('')
      .toLowerCase() // Convert to lowercase
      .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
      .replace(/^-+|-+$/g, ''); // Remove leading or trailing hyphens
  }
  
  const handleClick = (e) => {
    e.preventDefault();
    console.log("Clicked product:", product.id);
    // Try both methods to see which works
    //window.location.href = `/product/${product.id}`;
    history.push(`/shop/${category.gender}/${createSlug(category.title)}/${category.id}/${createSlug(product.name)}/${product.id}`);
  };


  return (
    <Card className="border-none shadow-none overflow-hidden cursor-pointer hover:scale-105" onClick={handleClick}>
      <CardContent className="p-0">
        <div className="aspect-[3/4] mb-4">
          <img 
            src={product.images[0].url} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="px-2">
          <h3 className="font-bold text-base mb-2">{product.name}</h3>
          <p className="text-gray-500 text-sm mb-2">{product.brand}</p>
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-light-gray font-bold line-through text-sm">
              ${product.price}
            </span>
            <span className="text-secondary-color font-bold">
              ${product.price}
            </span>
          </div>
          <div className="flex justify-center gap-2 mb-4">
            {product.colors?.map((color, index) => (
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