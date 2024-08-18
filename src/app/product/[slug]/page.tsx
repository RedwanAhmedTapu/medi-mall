"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  useGetProductsQuery,
  useGetVariantsQuery,
} from "../../../features/apiSlice";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../features/cartSlice";
import { Product, Variant } from "../../../types/types"; // Import Product and Variant types

export default function ProductDetail() {
  const router = useRouter();
  const { slug } = useParams();
  const {
    data: products,
    isLoading: productsLoading,
    isError: productsError,
  } = useGetProductsQuery();
  const {
    data: variants,
    isLoading: variantsLoading,
    isError: variantsError,
  } = useGetVariantsQuery();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<Variant | undefined>(
    undefined
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (products && slug) {
      const foundProduct = products.find((item) => item.slug === slug);
      setProduct(foundProduct || null);

      if (foundProduct?.variants && variants) {
        const firstVariantId = foundProduct?.variants[0]._id;
        console.log(firstVariantId)
        const firstVariant = variants.find(
          (variant) => variant._id === firstVariantId
        );
        console.log(foundProduct);
        setSelectedVariant(firstVariant); // Set the first variant as selectedVariant
      }
    }
  }, [products, slug, variants]);

  if (productsLoading || variantsLoading) {
    return (
      <div className="text-center text-2xl font-semibold text-blue-600">
        Loading...
      </div>
    );
  }

  if (productsError || variantsError) {
    return (
      <div className="text-center text-2xl font-semibold text-red-600">
        Error loading products
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center text-2xl font-semibold text-yellow-600">
        Product not found
      </div>
    );
  }

  const handleAddToCart = () => {
    if (selectedVariant) {
      dispatch(
        addToCart({
          productId: product._id,
          name: product.name,
          price: selectedVariant.price,
          quantity: 1,
          variant: selectedVariant.name,
        })
      );
      router.push("/cart");
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 sm:px-8 lg:px-10 bg-white rounded-lg shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Product Image */}
        <div className="relative">
          <img
            src={product.photos[0]}
            alt={product.name}
            width={500}
            height={300}
            className="w-full h-auto object-cover rounded-lg border-2 border-gray-200 shadow-sm transition-transform transform hover:scale-105"
          />
        </div>

        {/* Product Details */}
        <div className="text-gray-900">
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="mb-6 text-lg">{product.description}</p>

          {product.variants && product.variants.length > 0 && (
            <div className="mt-6">
              <label
                htmlFor="variant"
                className="block text-md font-medium text-gray-700"
              >
                Choose a variant:
              </label>
              <select
                id="variant"
                value={selectedVariant?.name || ""}
                onChange={(e) => {
                  if (variants) {
                    // Check if variants is defined
                    const selected = variants.find(
                      (variant) => variant.name === e.target.value
                    );
                    setSelectedVariant(selected);
                  }
                }}
                className="mt-2 block w-full pl-3 pr-10 py-2 text-base bg-white text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                {product.variants &&
                  product.variants.map((variantId) => {
                    const variant = variants?.find(
                      (variant) => variant._id === variantId._id
                    );
                    return variant ? (
                      <option key={variant._id} value={variant.name}>
                        {variant.name} - ${variant.price}
                      </option>
                    ) : null;
                  })}
              </select>
            </div>
          )}

          <div className="mt-8">
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 text-white px-6 py-3 rounded-md shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
