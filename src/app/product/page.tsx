"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetProductsQuery } from "../../features/apiSlice";
import { FaAngleRight, FaTh, FaThList, FaSlidersH } from "react-icons/fa";
import { addToCart } from "../../features/cartSlice";
import CartModal from "./components/CartModal";
import { RootState } from '../../store/store';
import { Product } from "@/types/Products";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [cartButtonStates, setCartButtonStates] = useState<{ [key: string]: boolean }>({});
  const [gridView, setGridView] = useState<'grid-3' | 'grid-4' | 'grid-2'>('grid-4'); // Default to 4-column grid
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]); // Default range [min, max]

  const dispatch = useDispatch();
  const { data: products, isLoading, isError } = useGetProductsQuery();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const categories = [
    { id: "accessories", name: "Accessories" },
    { id: "blood-pressure", name: "Blood Pressure" },
    { id: "equipments", name: "Equipments" },
    { id: "hand-gloves", name: "Hand Gloves" },
    { id: "masks", name: "Masks" },
    { id: "medicines", name: "Medicine" },
    { id: "medkits", name: "Medkits" },
    { id: "minerals", name: "Minerals" },
    { id: "nutritions", name: "Nutritions" },
    { id: "pharmacy", name: "Pharmacy" },
    { id: "safety-guard", name: "Safety Guard" },
    { id: "surgical-mask", name: "Surgical Mask" },
    { id: "vitamins", name: "Vitamins" },
  ];

  useEffect(() => {
    // Handle price range changes
    if (products) {
      // Filter products based on price range
    }
  }, [priceRange, products]);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleAddToCart = (product: Product) => {
    dispatch(
      addToCart({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        variant: product.primaryCategoryId?.name || "",
      })
    );
    setCartButtonStates((prevState) => ({
      ...prevState,
      [product._id]: true,
    }));
  };

  const handleViewCart = () => {
    setIsCartModalOpen(true);
  };

  const getButtonState = (productId: string) => {
    return cartButtonStates[productId] || false;
  };

  const filteredProducts = products
    ? products.filter(
        (product) =>
          (!selectedCategory || (product as Product).primaryCategoryId?.name === selectedCategory) &&
          product.price >= priceRange[0] &&
          product.price <= priceRange[1]
      )
    : [];

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-gray-100 p-4">
        <h2 className="text-lg font-bold mb-4">Shop by Category</h2>
        <ul>
          {categories.map((category) => (
            <li key={category.id} className="mb-2">
              <button
                className={`text-left w-full p-2 flex items-center justify-between rounded ${
                  selectedCategory === category.id
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-800"
                }`}
                onClick={() => handleCategorySelect(category.id)}
              >
                {category.name}
                <FaAngleRight
                  className={`${
                    selectedCategory === category.id
                      ? "text-white"
                      : "text-gray-500"
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <h3 className="text-lg font-bold mb-2">Price Range</h3>
          <div className="flex items-center space-x-2">
            <span>${priceRange[0]}</span>
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
              className="w-full"
            />
            <span>${priceRange[1]}</span>
          </div>
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
            className="w-full"
          />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4">
        <div className="mb-4 flex items-center space-x-2">
          <button
            onClick={() => setGridView('grid-2')}
            className={`p-2 ${gridView === 'grid-2' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            <FaTh className="text-xl" />
          </button>
          <button
            onClick={() => setGridView('grid-3')}
            className={`p-2 ${gridView === 'grid-3' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            <FaThList className="text-xl" />
          </button>
          <button
            onClick={() => setGridView('grid-4')}
            className={`p-2 ${gridView === 'grid-4' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            <FaSlidersH className="text-xl" />
          </button>
        </div>

        {isLoading && <p>Loading products...</p>}
        {isError && <p>Error loading products</p>}
        {!isLoading && !isError && filteredProducts && (
          <div className={`grid ${gridView === 'grid-2' ? 'grid-cols-2' : gridView === 'grid-3' ? 'grid-cols-3' : 'grid-cols-4'} gap-2 md:gap-6`}>
            {filteredProducts.map((product) => (
              <div key={product._id} className="border rounded-lg p-4 bg-white shadow-sm">
                <img
                  src={product.photos[0]}
                  alt={product.name}
                  className="max-w-full h-48 object-cover mb-4 rounded"
                />
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p className="text-gray-700">${product.price}</p>
                <button
                  onClick={() => {
                    if (getButtonState(product._id)) {
                      handleViewCart();
                    } else {
                      handleAddToCart(product as Product);
                    }
                  }}
                  className="mt-2 w-full h-12 text-sm sm:text-lg bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  {getButtonState(product._id) ? "View Cart" : "Add to Cart"}
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Cart Modal */}
      {isCartModalOpen && (
        <CartModal onClose={() => setIsCartModalOpen(false)} />
      )}
    </div>
  );
}
