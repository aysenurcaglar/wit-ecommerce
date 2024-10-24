import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow w-screen">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Witty Store</h1>
        <nav className=''>
          <a href="#shop" className="mx-4 text-light-gray font-semibold">Shop</a>
          <a href="#about" className="mx-4 text-light-gray font-semibold">About</a>
          <a href="#blog" className="mx-4 text-light-gray font-semibold">Blog</a>
          <a href="#contact" className="mx-4 text-light-gray font-semibold">Contact</a>
          <a href="#pages" className="mx-4 text-light-gray font-semibold">Pages</a>
        </nav>
        <div className="flex space-x-4">
          <a href="#login" className="text-primary-color font-semibold">Login / Register</a>
          <a href="#login" className="text-primary-color font-semibold">Search</a>
          <a href="#cart" className="text-primary-color font-semibold">Cart</a>
          <a href="#login" className="text-primary-color font-semibold">Favs</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
