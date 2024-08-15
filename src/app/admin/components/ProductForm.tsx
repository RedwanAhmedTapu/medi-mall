'use client';

import React, { useState, useEffect } from 'react';
import { useAddProductMutation, useGetCategoriesQuery, useGetVariantsQuery } from '../../../features/apiSlice';
import { Category, Variant } from '../../../types/types';

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
  const [primaryCategory, setPrimaryCategory] = useState('');
  const [secondaryCategory, setSecondaryCategory] = useState('');
  const [tertiaryCategory, setTertiaryCategory] = useState('');
  const [selectedVariants, setSelectedVariants] = useState<Variant[]>([]); // Updated to use Variant[]

  const { data: categories } = useGetCategoriesQuery();
  const { data: allVariants } = useGetVariantsQuery();
  const [addProduct, { isLoading, isError, isSuccess }] = useAddProductMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Map selected variants to their IDs for the mutation
      const variantIds = selectedVariants.map(variant => variant._id);

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
        variants: variantIds, // Send only the IDs to the server
      }).unwrap();
      alert('Product added successfully');
      // Reset form fields here if needed
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700">Product Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="slug" className="block text-gray-700">Slug</label>
        <input
          type="text"
          id="slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full p-2 border rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="photos" className="block text-gray-700">Photos</label>
        <input
          type="text"
          id="photos"
          value={photos.join(', ')}
          onChange={(e) => setPhotos(e.target.value.split(', '))}
          className="w-full p-2 border rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="metaKey" className="block text-gray-700">Meta Keywords</label>
        <input
          type="text"
          id="metaKey"
          value={metaKey}
          onChange={(e) => setMetaKey(e.target.value)}
          className="w-full p-2 border rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="price" className="block text-gray-700">Price</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          className="w-full p-2 border rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="discount" className="block text-gray-700">Discount</label>
        <input
          type="number"
          id="discount"
          value={discount}
          onChange={(e) => setDiscount(parseFloat(e.target.value))}
          className="w-full p-2 border rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="stockStatus" className="block text-gray-700">In Stock</label>
        <input
          type="checkbox"
          id="stockStatus"
          checked={stockStatus}
          onChange={(e) => setStockStatus(e.target.checked)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="status" className="block text-gray-700">Active</label>
        <input
          type="checkbox"
          id="status"
          checked={status}
          onChange={(e) => setStatus(e.target.checked)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="primaryCategory" className="block text-gray-700">Primary Category</label>
        <select
          id="primaryCategory"
          value={primaryCategory}
          onChange={(e) => setPrimaryCategory(e.target.value)}
          className="w-full p-2 border rounded-lg"
        >
          <option value="">Select a Primary Category</option>
          {categories?.map((category: Category) => (
            <option key={category._id} value={category._id}>{category.name}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="secondaryCategory" className="block text-gray-700">Secondary Category</label>
        <select
          id="secondaryCategory"
          value={secondaryCategory}
          onChange={(e) => setSecondaryCategory(e.target.value)}
          className="w-full p-2 border rounded-lg"
        >
          <option value="">Select a Secondary Category</option>
          {categories?.map((category: Category) => (
            <option key={category._id} value={category._id}>{category.name}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="tertiaryCategory" className="block text-gray-700">Tertiary Category</label>
        <select
          id="tertiaryCategory"
          value={tertiaryCategory}
          onChange={(e) => setTertiaryCategory(e.target.value)}
          className="w-full p-2 border rounded-lg"
        >
          <option value="">Select a Tertiary Category</option>
          {categories?.map((category: Category) => (
            <option key={category._id} value={category._id}>{category.name}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="variants" className="block text-gray-700">Variants</label>
        <select
          id="variants"
          value={selectedVariants.map(v => v._id)} // Display selected variant IDs
          onChange={(e) => {
            const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
            const updatedVariants = allVariants?.filter(variant => selectedValues.includes(variant._id)) || [];
            setSelectedVariants(updatedVariants);
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
