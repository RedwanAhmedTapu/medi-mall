"use client";

import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useGetProductsQuery } from '../../features/apiSlice';
import { updateQuantity, removeFromCart } from '../../features/cartSlice';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Cart() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { data: products, isError } = useGetProductsQuery();
  const dispatch = useDispatch();

  // State to ensure cart is only rendered when products are loaded
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (products) {
      setHydrated(true);
    }
  }, [products]);

  useEffect(() => {
    if (isError) {
      toast.error("Failed to load products. Please try again.");
    }
  }, [isError]);

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) return;
    dispatch(updateQuantity({ productId, quantity }));
    toast.success("Quantity updated successfully!");
  };

  const handleRemoveFromCart = (productId: string) => {
    dispatch(removeFromCart(productId));
    toast.success("Item removed from cart.");
  };

  const getProductDetails = (productId: string) => {
    return products?.find((product) => product._id === productId);
  };

  if (!hydrated) {
    return null; // Render nothing until hydration is complete
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-white shadow-lg rounded-lg">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Shopping Cart</h1>
      <ul className="divide-y divide-gray-300">
        {cartItems.map((item) => {
          const product = getProductDetails(item.productId);
          return (
            <li key={item.productId} className="py-4 flex items-center">
              <div className="ml-3 flex-1">
                <p className="text-lg font-semibold text-gray-900">{product?.name}</p>
                <p className="text-sm text-gray-500">Variant: {item.variant}</p>
                <p className="text-sm text-gray-900">${item.price}</p>
                <div className="mt-2 flex items-center">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleUpdateQuantity(item.productId, parseInt(e.target.value))}
                    className="border-gray-300 rounded-md w-16 text-center mr-4"
                  />
                  <button
                    onClick={() => handleRemoveFromCart(item.productId)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="mt-6 flex justify-end">
        <a
          href="/checkout"
          className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white px-6 py-3 rounded-md shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 hover:brightness-125"
        >
          Proceed to Checkout
        </a>
      </div>
    </div>
  );
}
