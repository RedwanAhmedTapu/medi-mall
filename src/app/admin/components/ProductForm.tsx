'use client'
import React, { useState } from 'react';
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
  const [primaryCategory, setPrimaryCategory] = useState<string>('');
  const [secondaryCategory, setSecondaryCategory] = useState<string>('');
  const [tertiaryCategory, setTertiaryCategory] = useState<string>('');
  const [selectedVariants, setSelectedVariants] = useState<string[]>([]); // Array of Variant IDs

  const { data: categories } = useGetCategoriesQuery();
  const { data: allVariants } = useGetVariantsQuery();
  const [addProduct, { isLoading, isError, isSuccess }] = useAddProductMutation();
  console.log(categories,"c")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
        variants: selectedVariants, // Array of Variant IDs
      }).unwrap();
      alert('Product added successfully');
      // Reset form fields here if needed
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
      {/* Form fields */}
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
      <div className="mb-4">
        <label htmlFor="slug" className="block text-gray-700">Slug</label>
        <input
          id="slug"
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full p-2 border rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="photos" className="block text-gray-700">Photos (URLs)</label>
        <input
          id="photos"
          type="text"
          value={photos.join(', ')}
          onChange={(e) => setPhotos(e.target.value.split(',').map(url => url.trim()))}
          className="w-full p-2 border rounded-lg"
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
        <label htmlFor="metaKey" className="block text-gray-700">Meta Key</label>
        <input
          id="metaKey"
          type="text"
          value={metaKey}
          onChange={(e) => setMetaKey(e.target.value)}
          className="w-full p-2 border rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="price" className="block text-gray-700">Price</label>
        <input
          id="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full p-2 border rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="discount" className="block text-gray-700">Discount</label>
        <input
          id="discount"
          type="number"
          value={discount}
          onChange={(e) => setDiscount(Number(e.target.value))}
          className="w-full p-2 border rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="stockStatus" className="block text-gray-700">In Stock</label>
        <input
          id="stockStatus"
          type="checkbox"
          checked={stockStatus}
          onChange={(e) => setStockStatus(e.target.checked)}
          className="mr-2"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="status" className="block text-gray-700">Status</label>
        <input
          id="status"
          type="checkbox"
          checked={status}
          onChange={(e) => setStatus(e.target.checked)}
          className="mr-2"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="primaryCategory" className="block text-gray-700">Primary Category</label>
        <select
          id="primaryCategory"
          value={primaryCategory}
          onChange={(e) => setPrimaryCategory(e.target.value)}
          className="w-full p-2 border rounded-lg"
          required
        >
          <option value="" disabled>Select Category</option>
          {categories?.map((category: Category) => (
            <option key={category._id} value={category._id}>{category.name}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="secondaryCategory" className="block text-gray-700">Secondary Category (Optional)</label>
        <select
          id="secondaryCategory"
          value={secondaryCategory}
          onChange={(e) => setSecondaryCategory(e.target.value)}
          className="w-full p-2 border rounded-lg"
        >
          <option value="">None</option>
          {categories?.map((category: Category) => (
            <option key={category._id} value={category._id}>{category.name}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="tertiaryCategory" className="block text-gray-700">Tertiary Category (Optional)</label>
        <select
          id="tertiaryCategory"
          value={tertiaryCategory}
          onChange={(e) => setTertiaryCategory(e.target.value)}
          className="w-full p-2 border rounded-lg"
        >
          <option value="">None</option>
          {categories?.map((category: Category) => (
            <option key={category._id} value={category._id}>{category.name}</option>
          ))}
        </select>
      </div>
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
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-lg">
        {isLoading ? 'Adding...' : 'Add Product'}
      </button>
      {isError && <p className="text-red-500 mt-2">Failed to add product. Please try again.</p>}
      {isSuccess && <p className="text-green-500 mt-2">Product added successfully!</p>}
    </form>
  );
};

export default ProductForm;
