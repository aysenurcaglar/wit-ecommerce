import React from 'react';

const editorsPickCategories = [
  { category: "Men", image: "men-image.jpg" },
  { category: "Women", image: "women-image.jpg" },
  { category: "Accessories", image: "accessories-image.jpg" },
  { category: "Kids", image: "kids-image.jpg" },
];

const EditorsPick = () => {
    return (
      <section className="py-12">
        <h2 className="text-2xl font-bold text-center mb-4">EDITOR'S PICK</h2>
        <p className="text-center text-gray-500 mb-6">Problems trying to resolve the conflict between</p>
        <div className="grid grid-cols-4 grid-rows-6 gap-4 mx-60">
          {/* Large Men item spanning 2 columns and 6 rows */}
          <div className="col-span-2 row-span-6 relative">
            <img src={editorsPickCategories[0].image} alt="Men" className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="absolute bottom-4 left-4 text-dark-gray text-lg font-bold px-4 py-2 bg-white">MEN</h3>
            </div>
          </div>
  
          {/* Women category spanning 6 rows starting from column 3 */}
          <div className="row-span-6 col-start-3 relative">
            <img src={editorsPickCategories[1].image} alt="Women" className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="absolute bottom-4 left-4 text-dark-gray text-lg font-bold px-4 py-2 bg-white">WOMEN</h3>
            </div>
          </div>
  
          {/* Accessories category in column 4, row 1-3 */}
          <div className="row-span-3 col-start-4 relative">
            <img src={editorsPickCategories[2].image} alt="Accessories" className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="absolute bottom-4 left-4 text-dark-gray text-lg font-bold px-4 py-2 bg-white">ACCESSORIES</h3>
            </div>
          </div>
  
          {/* Kids category in column 4, row 4-6 */}
          <div className="row-span-3 col-start-4 row-start-4 relative">
            <img src={editorsPickCategories[3].image} alt="Kids" className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="absolute bottom-4 left-4 text-dark-gray text-lg font-bold px-4 py-2 bg-white">KIDS</h3>
            </div>
          </div>
        </div>
      </section>
    );
  };

export default EditorsPick;
