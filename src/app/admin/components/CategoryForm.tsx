// CategoryForm.tsx
"use client"
import React, { useState } from 'react';
import { useAddCategoryMutation } from '../../../features/apiSlice';

const CategoryForm = () => {
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [addCategory, { isLoading, isError, isSuccess }] = useAddCategoryMutation();
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        await addCategory({ name, slug, thumbnail }).unwrap();
        setName('');
        setSlug('');
        setThumbnail('');
        alert('Category added successfully');
      } catch (error) {
        console.error('Failed to add category:', error);
      }
    };
  
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newName = e.target.value;
      setName(newName);
      setSlug(newName.toLowerCase().replace(/\s+/g, '-'));
    };
  
    return (
      <div className='w-full h-full '>
      <form onSubmit={handleSubmit} className="p-4 w-[80%] mx-auto bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Add New Category</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Category Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
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
            readOnly
            className="w-full p-2 border rounded-lg bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="thumbnail" className="block text-gray-700">Thumbnail URL</label>
          <input
            type="text"
            id="thumbnail"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg"
          disabled={isLoading}
        >
          {isLoading ? 'Adding...' : 'Add Category'}
        </button>
        {isSuccess && <p className="text-green-500 mt-2">Category added successfully!</p>}
        {isError && <p className="text-red-500 mt-2">Failed to add category.</p>}
      </form>
      </div>
    );
  };
  
  export default CategoryForm;

