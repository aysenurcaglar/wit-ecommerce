import React from 'react';

const editorsPickCategories = [
  { category: "Men", image: "men-image.jpg" },
  { category: "Women", image: "women-image.jpg" },
  { category: "Accessories", image: "accessories-image.jpg" },
  { category: "Kids", image: "kids-image.jpg" },
];

const EditorsPick = () => {
  return (
    <section className="py-8 md:py-12 px-4">
      <h2 className="text-xl md:text-2xl font-bold text-center mb-4">EDITOR'S PICK</h2>
      <p className="text-center text-gray-500 mb-6 px-4">
        Problems trying to resolve the conflict between
      </p>
      
      {/* Mobile Layout */}
      <div className="md:hidden grid grid-cols-1 gap-4 px-4">
        <div className="relative aspect-square">
          <img src={editorsPickCategories[0].image} alt="Men" className="w-full h-full object-cover" />
          <h3 className="absolute bottom-4 left-4 text-dark-gray text-base font-bold px-4 py-2 bg-white">
            MEN
          </h3>
        </div>
        <div className="relative aspect-square">
          <img src={editorsPickCategories[1].image} alt="Women" className="w-full h-full object-cover" />
          <h3 className="absolute bottom-4 left-4 text-dark-gray text-base font-bold px-4 py-2 bg-white">
            WOMEN
          </h3>
        </div>
        <div className="relative aspect-square">
          <img src={editorsPickCategories[2].image} alt="Women" className="w-full h-full object-cover" />
          <h3 className="absolute bottom-4 left-4 text-dark-gray text-base font-bold px-4 py-2 bg-white">
            ACCESSORIES
          </h3>
        </div>
        <div className="relative aspect-square">
          <img src={editorsPickCategories[3].image} alt="Women" className="w-full h-full object-cover" />
          <h3 className="absolute bottom-4 left-4 text-dark-gray text-base font-bold px-4 py-2 bg-white">
            KIDS
          </h3>
        </div>
      </div>
      

      {/* Desktop Layout */}
      <div className="hidden md:grid grid-cols-4 grid-rows-6 gap-4 mx-60">
        <div className="col-span-2 row-span-6 relative">
          <img src={editorsPickCategories[0].image} alt="Men" className="w-full h-full object-cover" />
          <h3 className="absolute bottom-4 left-4 text-dark-gray text-lg font-bold px-4 py-2 bg-white">
            MEN
          </h3>
        </div>
        <div className="row-span-6 relative">
          <img src={editorsPickCategories[1].image} alt="Women" className="w-full h-full object-cover" />
          <h3 className="absolute bottom-4 left-4 text-dark-gray text-lg font-bold px-4 py-2 bg-white">
            WOMEN
          </h3>
        </div>
        <div className="row-span-3 relative">
          <img src={editorsPickCategories[2].image} alt="Accessories" className="w-full h-full object-cover" />
          <h3 className="absolute bottom-4 left-4 text-dark-gray text-lg font-bold px-4 py-2 bg-white">
            ACCESSORIES
          </h3>
        </div>
        <div className="row-span-3 relative">
          <img src={editorsPickCategories[3].image} alt="Kids" className="w-full h-full object-cover" />
          <h3 className="absolute bottom-4 left-4 text-dark-gray text-lg font-bold px-4 py-2 bg-white">
            KIDS
          </h3>
        </div>
      </div>
    </section>
  );
  };

export default EditorsPick;
