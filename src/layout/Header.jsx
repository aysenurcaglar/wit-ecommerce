import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  AlignRight,
  Heart,
  Search,
  UserRound,
  ChevronDown,
} from "lucide-react";
import { setUser } from "../store/actions/clientActions";
import { toast } from "react-toastify";
import CategoryDropdown from "../components/CategoryDropdown";
import Cart from "../components/Cart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  // Get user data from Redux store
  const user = useSelector((state) => state.client.user);

  // Logout function
  const handleLogout = () => {
    dispatch(setUser({})); // Clear user data in Redux
    localStorage.removeItem("authToken"); // Remove token from localStorage
    localStorage.removeItem("user"); // Remove user data from localStorage
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("user");
    localStorage.removeItem("hasVisitedBefore");
    sessionStorage.removeItem("hasVisitedBefore");

    // Redirect user to home page or login page if necessary
    history.push("/login");
    toast.success("Logout successful!", {
      autoClose: 3000,
    });
  };

  return (
    <header className="bg-white shadow w-screen">
      <div className="container max-w-[85vw] md:max-w-75vw mx-auto px-4 py-4 md:py-6">
        <div className="flex justify-between items-center">
          <a href="/" className="text-xl md:text-2xl font-bold">
            Witty Store
          </a>

          {/* Mobile menu button */}
          <div className="xl:hidden flex space-x-6">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <AlignRight />
            </button>
          </div>

          {/* Desktop navigation */}

          <div className="hidden xl:flex flex-row items-center space-x-2 xl:space-x-4 text-light-gray font-semibold">
            <CategoryDropdown />
            <a href="/about">About</a>
            <a href="/pricing">Pricing</a>
            <a href="/contact">Contact</a>
            <a href="/team">Team</a>
          </div>

          {/* Desktop user actions */}
          <div className="hidden xl:flex items-center space-x-4 text-primary-color font-semibold">
            {user.name ? (
              <div className="flex items-center space-x-4">
                <img
                  src={user.avatarUrl}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full"
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex cursor-pointer">
                      <span className="text-md">{user.name}</span>
                      <ChevronDown className="ml-1 mt-1 h-5 w-5" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="text-primary-color font-semibold">
                    <DropdownMenuItem
                      onSelect={() => history.push("/previous-orders")}
                    >
                      Previous Orders
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={handleLogout}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <a href="/login">
                <UserRound className="inline" />
                Login / Signup
              </a>
            )}
            <a href="#search">
              <Search />
            </a>
            <Cart />
            <a href="#favorites">
              <Heart />
            </a>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="xl:hidden mt-4">
            <nav className="flex flex-col items-center justify-center space-y-4">
              <CategoryDropdown />
              <a href="/about" className="text-light-gray font-semibold">
                About
              </a>
              <a href="/pricing" className="text-light-gray font-semibold">
                Pricing
              </a>
              <a href="/contact" className="text-light-gray font-semibold">
                Contact
              </a>
              <a href="/team" className="text-light-gray font-semibold">
                Team
              </a>
            </nav>
            <div className="flex flex-col items-center space-y-4 mt-4 pt-4 border-t border-slate-300 text-primary-color font-semibold">
              <div className="flex flex-row items-center space-x-4">
                <a href="#search">
                  <Search />
                </a>
                <Cart />
                <a href="#favorites">
                  <Heart />
                </a>
              </div>
              {user.name ? (
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex flex-row items-center space-x-4">
                    <img
                      src={user.avatarUrl}
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div className="p-2 flex">
                          <span>{user.name}</span>
                          <ChevronDown className="ml-1 mt-1 h-4 w-4" />
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="text-primary-color font-semibold">
                        <DropdownMenuItem
                          onSelect={() => history.push("/previous-orders")}
                        >
                          Previous Orders
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={handleLogout}>
                          Logout
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ) : (
                <a href="/login" className="text-primary-color font-semibold">
                  <UserRound className="inline" />
                  Login / Signup
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
