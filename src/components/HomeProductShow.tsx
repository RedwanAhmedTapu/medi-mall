'use client';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetProductsQuery } from '../features/apiSlice';
import { addToCart } from '../features/cartSlice'; // Adjust the import according to your folder structure
import CartModal from '../app/product/components/CartModal'; // Import your modal component
import Link from 'next/link';
import { RootState } from '@/store/store';
import { Product } from '@/types/Products';

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [cartButtonStates, setCartButtonStates] = useState<{ [key: string]: boolean }>({});

  const dispatch = useDispatch(); // Initialize dispatch from redux
  const { data: products, isLoading, isError } = useGetProductsQuery();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'medicine', name: 'Medicine' },
    { id: 'equipments', name: 'Equipments' },
    { id: 'accessories', name: 'Accessories' },
  ];

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId === 'all' ? null : categoryId);
  };

  const handleAddToCart = (product: Product) => {
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
    <div className="flex flex-col lg:flex-row">
      {/* Sidebar with Banner (Hidden on Mobile) */}
      <aside className="w-full lg:w-64 p-4 border-r hidden lg:block">
        <img
          src="https://radiustheme.com/demo/wordpress/themes/medimall/wp-content/uploads/2022/06/ad-banner_4.png"
          alt="Banner"
          className="w-full h-auto object-cover mb-4"
        />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4">
        <div className="flex justify-center items-center mb-4">
          <h2 className="text-xl md:text-2xl font-semibold text-slate-800">Our Latest Products</h2>
        </div>
        <div className="flex flex-col">
          <div className="mb-4">
            <h3 className="text-lg font-bold">Product Categories</h3>
            <ul className="mt-2 flex flex-wrap gap-2">
              {categories.map((category) => (
                <li key={category.id} className="mb-2">
                  <button
                    onClick={() => handleCategorySelect(category.id)}
                    className={`w-28 sm:w-32 text-left py-2 px-4 rounded-lg transition text-center ${
                      selectedCategory === category.id ? 'bg-blue-600 text-white' : 'bg-gray-100'
                    }`}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {isLoading && <p>Loading products...</p>}
            {isError && <p>Error loading products</p>}
            {!isLoading && !isError && filteredProducts && (
              filteredProducts.map((product) => (
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
                        handleAddToCart(product as Product);
                      }
                    }}
                    className="mt-2 w-full bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    {getButtonState(product._id) ? 'View Cart' : 'Add to Cart'}
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Cart Modal */}
      {isCartModalOpen && (
        <CartModal onClose={() => setIsCartModalOpen(false)} />
      )}
    </div>
  );
}
