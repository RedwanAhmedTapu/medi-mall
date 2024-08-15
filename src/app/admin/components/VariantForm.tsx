// VariantForm.tsx
'use client'
import React, { useState } from 'react';
import { useAddVariantMutation } from '../../../features/apiSlice';
import { categories } from '../../../data/categories'; 

const VariantForm = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState('');
    const [variantName, setVariantName] = useState('');
    const [addVariant, { isLoading, isError, isSuccess }] = useAddVariantMutation();
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        await addVariant({ name: variantName, price }).unwrap();
        setName('');
        setPrice(0);
        setCategory('');
        setVariantName('');
        alert('Variant added successfully');
      } catch (error) {
        console.error('Failed to add variant:', error);
      }
    };
  
    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedCategory = e.target.value;
      setCategory(selectedCategory);
      setVariantName(`${selectedCategory} 20mg`);
    };
  
    return (
      <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Add New Variant</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Variant Name</label>
          <input
            type="text"
            id="name"
            value={variantName}
            onChange={(e) => setVariantName(e.target.value)}
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
          <label htmlFor="category" className="block text-gray-700">Category</label>
          <select
            id="category"
            value={category}
            onChange={handleCategoryChange}
            className="w-full p-2 border rounded-lg"
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg"
          disabled={isLoading}
        >
          {isLoading ? 'Adding...' : 'Add Variant'}
        </button>
        {isSuccess && <p className="text-green-500 mt-2">Variant added successfully!</p>}
        {isError && <p className="text-red-500 mt-2">Failed to add variant.</p>}
      </form>
    );
  };
  
  export default VariantForm;