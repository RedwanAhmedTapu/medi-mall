"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useAddShippingAddressMutation } from "../../features/apiSlice";
import { toast } from "react-toastify";

const divisions = [
  {
    name: "Dhaka",
    districts: [
      "Dhaka District",
      "Gazipur",
      "Kishoreganj",
      "Madaripur",
      "Manikganj",
      "Munshiganj",
      "Narsingdi",
      "Narayanganj",
      "Tangail",
    ],
  },
  {
    name: "Chattogram",
    districts: [
      "Bandarban",
      "Brahmanbaria",
      "Chandpur",
      "Chattogram",
      "Cox's Bazar",
      "Khagrachari",
      "Lakshmipur",
      "Noakhali",
      "Rangamati",
    ],
  },
  // Add other divisions and districts here
];

const CheckoutPage: React.FC = () => {
  const [addShippingAddress] = useAddShippingAddressMutation();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    company: "",
    country: "",
    streetAddress: "",
    apartment: "",
    city: "",
    district: "",
    postcode: "",
    phone: "",
    email: "",
    orderNotes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  

  const handleDivisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormState({ ...formState, district: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addShippingAddress(formState).unwrap();
      toast.success("Order placed successfully!");
      setFormState({
        firstName: "",
        lastName: "",
        company: "",
        country: "",
        streetAddress: "",
        apartment: "",
        city: "",
        district: "",
        postcode: "",
        phone: "",
        email: "",
        orderNotes: "",
      });
    } catch (error) {
      toast.error("Failed to place order.");
    }
  };

  const filteredDistricts =
    divisions.find((d) => d.name === formState.country)?.districts || [];

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Billing Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              value={formState.firstName}
              onChange={handleChange}
              placeholder="First Name *"
              className="block w-full p-3 border rounded-md"
              required
            />
            <input
              type="text"
              name="lastName"
              value={formState.lastName}
              onChange={handleChange}
              placeholder="Last Name *"
              className="block w-full p-3 border rounded-md"
              required
            />
            <input
              type="text"
              name="company"
              value={formState.company}
              onChange={handleChange}
              placeholder="Company Name (optional)"
              className="block w-full p-3 border rounded-md"
            />
            <input
              type="text"
              name="country"
              value={formState.country}
              onChange={handleChange}
              placeholder="Country / Region *"
              className="block w-full p-3 border rounded-md"
              required
            />
            <input
              type="text"
              name="streetAddress"
              value={formState.streetAddress}
              onChange={handleChange}
              placeholder="Street Address *"
              className="block w-full p-3 border rounded-md"
              required
            />
            <input
              type="text"
              name="apartment"
              value={formState.apartment}
              onChange={handleChange}
              placeholder="Apartment, suite, unit, etc. (optional)"
              className="block w-full p-3 border rounded-md"
            />
            <input
              type="text"
              name="city"
              value={formState.city}
              onChange={handleChange}
              placeholder="Town / City *"
              className="block w-full p-3 border rounded-md"
              required
            />
            <label
              id="district-label"
              className="block text-sm font-medium text-gray-700"
            >
              Select District
            </label>
            <select
              name="district"
              value={formState.district}
              onChange={handleChange}
              className="block w-full p-3 border rounded-md"
              required
              disabled={!formState.country}
              aria-labelledby="district-label"
            >
              <option value="" disabled>
                Select District
              </option>
              {filteredDistricts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>

            <input
              type="text"
              name="postcode"
              value={formState.postcode}
              onChange={handleChange}
              placeholder="Postcode / ZIP (optional)"
              className="block w-full p-3 border rounded-md"
            />
            <input
              type="tel"
              name="phone"
              value={formState.phone}
              onChange={handleChange}
              placeholder="Phone *"
              className="block w-full p-3 border rounded-md"
              required
            />
            <input
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              placeholder="Email address *"
              className="block w-full p-3 border rounded-md"
              required
            />
            <textarea
              name="orderNotes"
              value={formState.orderNotes}
              onChange={handleChange}
              placeholder="Additional information (optional)"
              className="block w-full p-3 border rounded-md"
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Your Order</h2>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.productId} className="flex justify-between">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>${item.price * item.quantity}</span>
              </div>
            ))}
            <div className="flex justify-between font-bold">
              <span>Subtotal</span>
              <span>${totalPrice}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${totalPrice}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-red-500 mb-4">
            Sorry, it seems that there are no available payment methods for your
            state. Please contact us if you require assistance or wish to make
            alternate arrangements.
          </p>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
