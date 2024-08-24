"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "../store/store";
import { useGetProductsQuery } from "../features/apiSlice";
import { Product } from "../types/types";

import { FaAngleDown, FaSearch, FaUser, FaCartPlus } from "react-icons/fa";

const Header: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const { data: products, isLoading, isError } = useGetProductsQuery();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const [suggestions, setSuggestions] = useState<Product[]>([]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    if (searchTerm && products) {
      const filteredSuggestions = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, products]);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSuggestionClick = (slug: string) => {
    setSearchTerm("");
    setSuggestions([]);
    router.push(`/product/${slug}`);
  };

  return (
    <header className="flex flex-wrap items-center justify-between p-4 bg-white shadow-md md:justify-center">
      {/* Logo Section */}
      <div className="w-full md:w-1/4 flex justify-center md:justify-start">
        <Link href="/" passHref>
          <Image
            width={227}
            height={51}
            src="https://radiustheme.com/demo/wordpress/themes/medimall/wp-content/themes/medimall/assets/img/logo-dark.svg"
            alt="Medimall"
            className="cursor-pointer"
          />
        </Link>
      </div>

      {/* Search Box Section */}
      <div className="w-full mt-4 md:mt-0 md:w-1/2 flex justify-center">
        <form method="get" action="/" className="flex w-full max-w-lg">
          <div className="relative flex w-full">
            <div className="relative">
              <button
                className="flex items-center px-4 py-2 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-l-md"
                type="button"
                onClick={toggleDropdown}
              >
                Categories
                <FaAngleDown className="ml-2" />
              </button>
              {dropdownOpen && (
                <ul className="absolute left-0  z-10 mt-1 bg-white border border-gray-200 rounded-md shadow-lg w-64 ">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Accessories
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Blood Pressure
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Equipments
                  </li>
                  {/* Add more categories here */}
                </ul>
              )}
            </div>
            <div className="relative w-full">
              <input
                type="text"
                autoComplete="off"
                value={searchTerm}
                onChange={handleSearchInputChange}
                className="flex-grow w-full px-4 py-2 text-sm text-gray-700 border-t border-b border-gray-300 focus:outline-none"
                placeholder="Search For Products ..."
              />
              {suggestions.length > 0 && (
                <ul className="absolute left-0 z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                  {suggestions.map((product) => (
                    <li
                      key={product._id}
                      className="flex items-center px-1 sm:px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSuggestionClick(product.slug || "")}
                    >
                      <img
                        src={product.photos[0]}
                        alt={product.name}
                        className="mr-2 w-16 h-16 rounded-md md:w-20 md:h-20 lg:w-24 lg:h-24"
                      />
                      <div className="flex-grow">
                        <p className="text-sm font-medium text-gray-800 md:text-base lg:text-lg">
                          {product.name}
                        </p>
                        <p className="text-sm text-gray-600 md:text-base lg:text-lg">
                          ${product.price.toFixed(2)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button
              title="Search"
              className="px-4 py-2 text-white bg-blue-600 border border-blue-600 rounded-r-md hover:bg-blue-700"
            >
              <FaSearch />
            </button>
          </div>
        </form>
      </div>

      {/* Action Buttons Section */}
      <div className="w-full mt-4 md:mt-0 md:w-1/4 flex justify-center md:justify-end space-x-6">
        <Link href="/" passHref>
          <div className="text-gray-700 hover:text-blue-600">
            <FaUser size={20} />
          </div>
        </Link>

        <Link href="/cart" passHref>
          <div className="relative flex items-center text-gray-700 hover:text-blue-600">
            <FaCartPlus size={20} />
            <span className="absolute bottom-3 left-3 px-1 text-xs text-white bg-red-500 rounded-full">
              {cartItems.length}
            </span>
            <span className="ml-2 text-sm">${totalPrice.toFixed(2)}</span>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
