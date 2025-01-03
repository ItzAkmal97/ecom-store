import { NavLink } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { useState } from "react";
import CartIcon from "./CartIcon";
import { CartPanel } from "./CartPanel";
function Header() {
  const [isScroll, setIsScroll] = useState<boolean>(false);

  const handleHeaderShadow = () => {
    setIsScroll(window.scrollY > 0);
  };
  window.addEventListener("scroll", handleHeaderShadow);

  const cssClass = "sticky top-0 bg-white z-50";
  const cssShadowClass = "shadow-md transition duration-600 ease-out";

  return (
    <header
      className={isScroll ? `${cssClass} ${cssShadowClass}` : `${cssClass}`}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto p-6">
        {/* Mobile Menu Button */}
        <label htmlFor="nav-toggle" className="lg:hidden cursor-pointer z-50">
          <Menu className="h-8 w-8" />
        </label>

        {/* Logo */}
        <h1 className="text-3xl font-extrabold lg:order-first absolute left-1/2 -translate-x-1/2 lg:relative lg:left-0 lg:translate-x-0">
          ShopSphere
        </h1>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex flex-1 items-center justify-center">
          <ul className="flex items-center gap-12 text-xl">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `hover:underline transition duration-400 ${
                    isActive ? "underline" : ""
                  }`
                }
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/About"
                className={({ isActive }) =>
                  `hover:underline transition duration-400 ${
                    isActive ? "underline" : ""
                  }`
                }
              >
                About
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Account and Cart Controls */}
        <div className="flex items-center gap-12">
          <NavLink to="/login" className="hidden lg:block">
            <User className="h-6 w-6" />
          </NavLink>
          <label htmlFor="cart-toggle" className="cursor-pointer">
            <CartIcon />
          </label>
        </div>
      </div>

      {/* Mobile Navigation */}
      <input type="checkbox" id="nav-toggle" className="hidden peer/nav" />
      <div
        className="fixed inset-y-0 left-0 w-[300px] bg-white shadow-2xl 
                    transform -translate-x-full peer-checked/nav:translate-x-0 
                    transition-transform duration-300 ease-in-out lg:hidden
                    z-50"
      >
        <div className="p-6">
          <label
            htmlFor="nav-toggle"
            className="absolute top-6 right-6 cursor-pointer"
          >
            <X className="h-8 w-8" />
          </label>
          <nav className="mt-16">
            <ul className="flex flex-col gap-8 text-xl">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block hover:underline transition duration-400 ${
                      isActive ? "underline" : ""
                    }`
                  }
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/About"
                  className={({ isActive }) =>
                    `block hover:underline transition duration-400 ${
                      isActive ? "underline" : ""
                    }`
                  }
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/login">
                  <User className="h-6 w-6" />
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Cart Slide-in Panel */}
      <input type="checkbox" id="cart-toggle" className="hidden peer/cart" />
      <div
        className="fixed inset-y-0 right-0 w-[400px] bg-white shadow-2xl 
                    transform translate-x-full peer-checked/cart:translate-x-0 
                    transition-transform duration-300 ease-in-out
                    z-50"
      >
        <div className="p-6">
          <label
            htmlFor='cart-toggle'
            className="absolute top-6 right-6 cursor-pointer"
          >
            <X className="h-8 w-8" />
          </label>
          <div className="mt-16">
            <CartPanel />
          </div>
        </div>
      </div>

      {/* Overlay */}
      <label
        htmlFor="nav-toggle"
        className="fixed inset-0 bg-black bg-opacity-50 
                  hidden peer-checked/nav:block lg:hidden z-40"
      />
      <label
        htmlFor="cart-toggle"
        className="fixed inset-0 bg-black bg-opacity-50 
                  hidden peer-checked/cart:block z-40"
      />
    </header>
  );
}

export default Header;
