'use client';

import React, { useState } from 'react';
import { useAddProductMutation, useGetCategoriesQuery, useGetVariantsQuery } from '../../../features/apiSlice';
import { Category, Variant, ProductVariant } from '../../../types/types';

const ProductForm = () => {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [metaKey, setMetaKey] = useState('');
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [stockStatus, setStockStatus] = useState(true);
  const [status, setStatus] = useState(true);
  const [primaryCategory, setPrimaryCategory] = useState<string>('');
  const [secondaryCategory, setSecondaryCategory] = useState<string>('');
  const [tertiaryCategory, setTertiaryCategory] = useState<string>('');
  const [selectedVariants, setSelectedVariants] = useState<string[]>([]); // Array of Variant IDs

  const { data: categories } = useGetCategoriesQuery();
  const { data: allVariants } = useGetVariantsQuery();
  const [addProduct, { isLoading, isError, isSuccess }] = useAddProductMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Transform selectedVariant IDs into ProductVariant objects
    const variantObjects: ProductVariant[] = selectedVariants
      .map(id => allVariants?.find(variant => variant._id === id))
      .filter((variant): variant is ProductVariant => variant !== undefined);

    try {
      await addProduct({
        name,
        slug,
        photos,
        description,
        metaKey,
        price,
        discount,
        stockStatus,
        status,
        primaryCategory,
        secondaryCategory,
        tertiaryCategory,
        variants: variantObjects, // Passing an array of ProductVariant objects
      }).unwrap();
      alert('Product added successfully');
      // Reset form fields here if needed
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
      {/* Existing form fields */}
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700">Product Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded-lg"
          required
        />
      </div>
      {/* ...other fields... */}
      <div className="mb-4">
        <label htmlFor="variants" className="block text-gray-700">Variants</label>
        <select
          id="variants"
          value={selectedVariants}
          onChange={(e) => {
            const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
            setSelectedVariants(selectedValues);
          }}
          className="w-full p-2 border rounded-lg"
          multiple
        >
          {allVariants?.map((variant: Variant) => (
            <option key={variant._id} value={variant._id}>{variant.name}</option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg"
        disabled={isLoading}
      >
        {isLoading ? 'Adding...' : 'Add Product'}
      </button>
      {isSuccess && <p className="text-green-500 mt-2">Product added successfully!</p>}
      {isError && <p className="text-red-500 mt-2">Failed to add product.</p>}
    </form>
  );
};

export default ProductForm;
