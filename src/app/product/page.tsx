"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetProductsQuery } from "../../features/apiSlice";
import { FaAngleRight } from "react-icons/fa";
import { addToCart } from "../../features/cartSlice";
import CartModal from "./components/CartModal";
import { RootState } from '../../store/store';
import { Product } from "@/types/Products";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [cartButtonStates, setCartButtonStates] = useState<{ [key: string]: boolean }>({});

  const dispatch = useDispatch(); // Initialize dispatch from redux
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

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleAddToCart = (product: Product) => {
    console.log(product, "add");
    dispatch(
      addToCart({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: 1, // Default quantity to 1 or adjust as needed
        variant: product.primaryCategoryId?.name || "", // Adjust based on how you handle variants
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

  const filteredProducts = selectedCategory
  ? products?.filter(
      (product) =>
        (product as Product).primaryCategoryId?.name === selectedCategory
    )
  : products;


  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 p-4">
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
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4">
        {isLoading && <p>Loading products...</p>}
        {isError && <p>Error loading products</p>}
        {!isLoading && !isError && filteredProducts && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product._id} className="border rounded-lg p-4">
                <img
                  src={product.photos[0]}
                  alt={product.name}
                  width={500}
                  height={300}
                  className="w-full h-48 object-cover mb-4"
                />
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p className="text-gray-700">${product.price}</p>
                <button
                  onClick={() => {
                    if (getButtonState(product._id)) {
                      handleViewCart();
                    } else {
                      console.log(product,"if")
                      handleAddToCart(product as Product);
                    }
                  }}
                  className="mt-2 w-full bg-blue-600 text-white px-4 py-2 rounded-lg"
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
