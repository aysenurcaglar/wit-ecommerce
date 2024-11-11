import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Button } from "../components/ui/button";
import { AlignRight, Heart, Search, UserRound } from "lucide-react";
import { setUser } from '../store/actions/clientActions';
import { toast } from "react-toastify";
import CategoryDropdown from "../components/CategoryDropdown";
import Cart from "../components/Cart";


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  // Get user data from Redux store
  const user = useSelector(state => state.client.user);

  // Logout function
  const handleLogout = () => {
    dispatch(setUser({})); // Clear user data in Redux
    localStorage.removeItem('authToken'); // Remove token from localStorage
    localStorage.removeItem('user'); // Remove user data from localStorage
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('user');
    // Redirect user to home page or login page if necessary
    history.push('/login');
    toast.success('Logout successful!', {
      autoClose: 3000,
    });
  };

  return (
    <header className="bg-white shadow w-screen">
      <div className="container max-w-[85vw] md:max-w-75vw mx-auto px-4 py-4 md:py-6">
        <div className="flex justify-between items-center">
          <a href="/" className="text-xl md:text-2xl font-bold">Witty Store</a>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex space-x-6">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <AlignRight />
          </button>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:block">
            <CategoryDropdown />          
            <a href="/about" className="mx-4 text-light-gray font-semibold">About</a>
            <a href="/blog" className="mx-4 text-light-gray font-semibold">Blog</a>
            <a href="/contact" className="mx-4 text-light-gray font-semibold">Contact</a>
            <a href="/team" className="mx-4 text-light-gray font-semibold">Team</a>
          </nav>

          {/* Desktop user actions */}
          <div className="hidden md:flex items-center space-x-4">
          {user.name ? (
              <div className="flex items-center space-x-4">
                <img src={user.avatarUrl} alt="User Avatar" className="w-8 h-8 rounded-full" />
                <span className="text-primary-color font-semibold">{user.name}</span>
                <span onClick={handleLogout} className="text-primary-color font-semibold cursor-pointer">Logout</span>
              </div>
            ) : (
              <a href="/login" className="text-primary-color font-semibold"><UserRound className="inline" />Login / Signup</a>
            )}
            <a href="#search" className="text-primary-color font-semibold"><Search /></a>
            <Cart />
            <a href="#favorites" className="text-primary-color font-semibold"><Heart /></a>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4">
            <nav className="flex flex-col items-center space-y-4">
              <CategoryDropdown />
              <a href="/about" className="text-light-gray font-semibold">About</a>
              <a href="/blog" className="text-light-gray font-semibold">Blog</a>
              <a href="/contact" className="text-light-gray font-semibold">Contact</a>
              <a href="/pages" className="text-light-gray font-semibold">Pages</a>
            </nav>
            <div className="flex flex-col items-center space-y-4 mt-4 pt-4 border-t border-slate-300">
            <div className="flex flex-row items-center space-x-4">
              <a href="#search" className="text-primary-color font-semibold"><Search /></a>
              <Cart />              
              <a href="#favorites" className="text-primary-color font-semibold"><Heart /></a>
              </div>
            {user.name ? (
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex flex-row items-center space-x-4">
                  <img src={user.avatarUrl} alt="User Avatar" className="w-8 h-8 rounded-full" />
                  <span className="text-primary-color font-semibold">{user.name}</span>
                  </div>
                  <span onClick={handleLogout} className="text-primary-color font-semibold cursor-pointer">Logout</span>
                </div>
              ) : (
                <a href="/login" className="text-primary-color font-semibold"><UserRound className="inline" />Login / Signup</a>
              )}              
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
