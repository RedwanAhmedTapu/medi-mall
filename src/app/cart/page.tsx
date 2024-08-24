"use client";

import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useGetProductsQuery } from "../../features/apiSlice";
import { updateQuantity, removeFromCart } from "../../features/cartSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from "react-paginate";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

export default function Cart() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { data: products, isError } = useGetProductsQuery();
  const dispatch = useDispatch();

  const [hydrated, setHydrated] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

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
    if (quantity < 1) return;
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

  const handlePageClick = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  const incrementQuantity = (productId: string, currentQuantity: number) => {
    handleUpdateQuantity(productId, currentQuantity + 1);
  };

  const decrementQuantity = (productId: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      handleUpdateQuantity(productId, currentQuantity - 1);
    }
  };

  const offset = currentPage * itemsPerPage;
  const paginatedItems = cartItems.slice(offset, offset + itemsPerPage);

  if (!hydrated) {
    return null;
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-white">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-48 w-48 mx-auto mb-4 animate-bounce"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Looks like you haven't added anything to your cart yet.
          </p>
          <a
            href="/product"
            className="bg-blue-600 text-white px-6 py-3 rounded-md shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
          >
            Shop Now
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-white shadow-lg rounded-lg">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Shopping Cart</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Variant
              </th>
              <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedItems.map((item) => {
              const product = getProductDetails(item.productId);
              return (
                <tr key={item.productId}>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {product?.name}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.variant}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${item.price}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <button
                      title="btn"
                        onClick={() =>
                          incrementQuantity(item.productId, item.quantity)
                        }
                        className="text-gray-600 hover:text-gray-800"
                      >
                        <AiOutlinePlus size={20} />
                      </button>
                      <input
                        title="input"
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleUpdateQuantity(
                            item.productId,
                            parseInt(e.target.value)
                          )
                        }
                        className="border-gray-300 rounded-md w-16 text-center mx-2"
                        readOnly
                      />
                      <button
                      title="btn"
                        onClick={() =>
                          decrementQuantity(item.productId, item.quantity)
                        }
                        className="text-gray-600 hover:text-gray-800"
                      >
                        <AiOutlineMinus size={20} />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-red-500 hover:text-red-700 transition">
                    <button
                      onClick={() => handleRemoveFromCart(item.productId)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-6 flex justify-end">
        <a
          href="/checkout"
          className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white px-6 py-3 rounded-md shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 hover:brightness-125"
        >
          Proceed to Checkout
        </a>
      </div>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={Math.ceil(cartItems.length / itemsPerPage)}
        onPageChange={handlePageClick}
        containerClassName={"pagination flex justify-center mt-6"}
        pageClassName={
          "mx-2 px-3 py-1 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300"
        }
        activeClassName={"bg-gray-400 text-white"}
        previousClassName={
          "mx-2 px-3 py-1 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300"
        }
        nextClassName={
          "mx-2 px-3 py-1 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300"
        }
      />
    </div>
  );
}
