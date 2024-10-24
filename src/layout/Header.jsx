import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow w-screen">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Witty Store</h1>
        <nav>
          <a href="#shop" className="mx-4 text-gray-600">Shop</a>
          <a href="#about" className="mx-4 text-gray-600">About</a>
          <a href="#blog" className="mx-4 text-gray-600">Blog</a>
          <a href="#contact" className="mx-4 text-gray-600">Contact</a>
        </nav>
        <div className="flex space-x-4">
          <a href="#login" className="text-gray-600">Login / Register</a>
          <a href="#cart" className="text-gray-600">Cart</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
