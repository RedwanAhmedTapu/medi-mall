"use client"

import { useState } from 'react';
import { FiBox, FiList, FiSettings } from 'react-icons/fi';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`bg-blue-800 text-white w-${isOpen ? '64' : '20'} transition-all duration-300`}>
      <div className="p-4">
        <button onClick={() => setIsOpen(!isOpen)} className="text-white">
          {isOpen ? 'Close' : 'Open'}
        </button>
      </div>
      <nav className="flex flex-col p-4 space-y-4">
        <a href="#" className="flex items-center space-x-4">
          <FiBox size={24} />
          {isOpen && <span>Products</span>}
        </a>
        <a href="#" className="flex items-center space-x-4">
          <FiList size={24} />
          {isOpen && <span>Categories</span>}
        </a>
        <a href="#" className="flex items-center space-x-4">
          <FiSettings size={24} />
          {isOpen && <span>Settings</span>}
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
