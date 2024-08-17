// src/pages/checkout.tsx
"use client";

import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import {useRouter} from 'next/navigation';

export default function Checkout() {
  const router=useRouter();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Checkout</h1>
      
      <div className="bg-gray-100 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Order Summary</h2>
        
        <ul className="divide-y divide-gray-300 mb-6">
          {cartItems.map(item => (
            <li key={item.productId} className="py-4 flex justify-between items-center">
              <div>
                <p className="text-lg font-medium text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
              </div>
              <span className="text-lg font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        
        <div className="flex justify-between items-center border-t border-gray-300 pt-4">
          <span className="text-lg font-semibold text-gray-700">Total</span>
          <span className="text-xl font-bold text-gray-900">${totalPrice.toFixed(2)}</span>
        </div>

        <button className="mt-8 w-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white py-3 rounded-md text-lg font-medium shadow-md hover:shadow-lg hover:scale-105 transition-transform" onClick={()=>{
          router.push("/shipping")
        }}>
          Go to shipping
        </button>
      </div>
    </div>
  );
}
