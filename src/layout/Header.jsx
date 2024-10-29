import { useState } from "react";
import { Button } from "../components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow w-screen">
      <div className="container mx-auto px-4 py-4 md:py-6">
        <div className="flex justify-between items-center">
          <a href="/" className="text-xl md:text-2xl font-bold">Witty Store</a>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:block">
            <a href="/shop" className="mx-4 text-light-gray font-semibold">Shop</a>
            <a href="#about" className="mx-4 text-light-gray font-semibold">About</a>
            <a href="#blog" className="mx-4 text-light-gray font-semibold">Blog</a>
            <a href="#contact" className="mx-4 text-light-gray font-semibold">Contact</a>
            <a href="#pages" className="mx-4 text-light-gray font-semibold">Pages</a>
          </nav>

          {/* Desktop user actions */}
          <div className="hidden md:flex space-x-4">
            <a href="#login" className="text-primary-color font-semibold">Login / Register</a>
            <a href="#search" className="text-primary-color font-semibold">Search</a>
            <a href="#cart" className="text-primary-color font-semibold">Cart</a>
            <a href="#favorites" className="text-primary-color font-semibold">Favs</a>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4">
            <nav className="flex flex-col space-y-4">
              <a href="#shop" className="text-light-gray font-semibold">Shop</a>
              <a href="#about" className="text-light-gray font-semibold">About</a>
              <a href="#blog" className="text-light-gray font-semibold">Blog</a>
              <a href="#contact" className="text-light-gray font-semibold">Contact</a>
              <a href="#pages" className="text-light-gray font-semibold">Pages</a>
            </nav>
            <div className="flex flex-col space-y-4 mt-4 pt-4 border-t">
              <a href="#login" className="text-primary-color font-semibold">Login / Register</a>
              <a href="#search" className="text-primary-color font-semibold">Search</a>
              <a href="#cart" className="text-primary-color font-semibold">Cart</a>
              <a href="#favorites" className="text-primary-color font-semibold">Favs</a>
              
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
