"use client"
import Link from 'next/link';
import { useState } from 'react';
import { FiPhoneCall, FiChevronDown, FiChevronUp } from 'react-icons/fi';

export default function Navbar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-700 shadow-md ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center ">
          <div className="flex items-center space-x-4 text-white">
            <Link href="/" className="text-2xl font-bold">MyShop</Link>
            <div className="hidden md:flex space-x-4">
              <Link href="/about" className="font-semibold">About Us</Link>
              <Link href="/product" className="font-semibold">Shop</Link>

              {/* Dropdown Menu for Pages */}
              <div className="relative">
                <button 
                  onClick={() => setDropdownOpen(!isDropdownOpen)}
                  className="text-white font-semibold flex items-center focus:outline-none"
                >
                  Pages
                  {isDropdownOpen ? (
                    <FiChevronUp className="ml-1 transition-transform transform rotate-180" />
                  ) : (
                    <FiChevronDown className="ml-1 transition-transform transform rotate-0" />
                  )}
                </button>
                {isDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
                    <Link href="/cart">
                      <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Cart
                      </div>
                    </Link>
                    <Link href="/checkout">
                      <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Checkout
                      </div>
                    </Link>
                    <Link href="/brand">
                      <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Brand
                      </div>
                    </Link>
                  </div>
                )}
              </div>
              <Link href="/contact" className="text-white font-semibold">Contact</Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <a href="tel:1.877.230.8449" className="text-white font-bold flex items-center">
              <FiPhoneCall className="mr-2" />
              <span className="hidden sm:inline">Need any help?</span>
              <span className="sm:hidden">Help?</span> <br className="hidden sm:block" /> 1.877.230.8449
            </a>
            <button 
              className="md:hidden text-white focus:outline-none" 
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <FiChevronUp /> : <FiChevronDown />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-b py-2">
            <Link href="/about">
              <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                About Us
              </div>
            </Link>
            <Link href="/product">
              <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Shop
              </div>
            </Link>
            <Link href="/cart">
              <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Cart
              </div>
            </Link>
            <Link href="/checkout">
              <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Checkout
              </div>
            </Link>
            <Link href="/brand">
              <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Brand
              </div>
            </Link>
            <Link href="/contact">
              <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Contact
              </div>
            </Link>
            <a href="tel:1.877.230.8449" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
              <FiPhoneCall className="mr-2" />
              1.877.230.8449
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
