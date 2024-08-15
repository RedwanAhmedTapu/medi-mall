// src/pages/checkout.tsx
"use client"

import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export default function Checkout() {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold">Checkout</h1>
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Order Summary</h2>
        <ul className="divide-y divide-gray-200 mt-4">
          {cartItems.map(item => (
            <li key={item.productId} className="py-4 flex justify-between">
              <span>{item.name} (x{item.quantity})</span>
              <span>${item.price * item.quantity}</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between mt-6">
          <span className="text-lg font-semibold">Total</span>
          <span className="text-lg font-semibold">${totalPrice}</span>
        </div>
        <button className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md">
          Confirm and Pay
        </button>
      </div>
    </div>
  );
}
