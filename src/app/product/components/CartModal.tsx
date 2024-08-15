"use client";

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store/store';
import { useGetProductsQuery } from '../../../features/apiSlice';
import { updateQuantity, removeFromCart } from '../../../features/cartSlice';
import { FaTimes } from 'react-icons/fa';

interface CartModalProps {
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ onClose }) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { data: products } = useGetProductsQuery();
  const dispatch = useDispatch();

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) return;
    dispatch(updateQuantity({ productId, quantity }));
  };

  const getProductDetails = (productId: string) => {
    return products?.find(product => product._id === productId);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-lg w-full relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
          <FaTimes size={24} />
        </button>
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Shopping Cart</h1>
        <ul className="divide-y divide-gray-200">
          {cartItems.length === 0 && (
            <p className="text-center text-gray-500 py-4">Your cart is empty.</p>
          )}
          {cartItems.map(item => {
            const product = getProductDetails(item.productId);
            return (
              <li key={item.productId} className="py-4 flex">
                <div className="flex-1">
                  <p className="text-lg font-semibold text-gray-900">{product?.name}</p>
                  <p className="text-sm text-gray-600 mt-1">Variant: {item.variant || 'None'}</p>
                  <p className="text-sm text-gray-900 mt-1">Price: ${item.price.toFixed(2)}</p>
                  <div className="mt-3 flex items-center space-x-4">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleUpdateQuantity(item.productId, parseInt(e.target.value))}
                      className="border border-gray-300 rounded-md w-16 text-center py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      onClick={() => dispatch(removeFromCart(item.productId))}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="mt-8 flex justify-end">
          <a
            href="/checkout"
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-md text-sm font-medium shadow-lg transition-all duration-200"
          >
            Proceed to Checkout
          </a>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
