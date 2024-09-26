"use client";

import { useState } from 'react';
import { FiBox, FiList, FiSettings, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import Link from 'next/link';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null); // Track which dropdown is open

  // Sidebar menu items with dropdowns
  const menuItems = [
    {
      label: 'Products',
      icon: <FiBox size={24} />,
      dropdownItems: [
        { label: 'Add Product', href: '/admin?query=product-add' },
        { label: 'Delete Product', href: '/admin?query=product-delete' },
        { label: 'Update Product', href: '/admin?query=product-update' },
      ],
    },
    {
      label: 'Categories',
      icon: <FiList size={24} />,
      dropdownItems: [
        { label: 'Add Category', href: '/admin?query=category-add' },
        { label: 'Delete Category', href: '/admin?query=category-delete' },
        { label: 'Update Category', href: '/admin?query=category-update' },
      ],
    },
  ];

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label); // Toggle open/close
  };

  return (
    <div className={`bg-blue-800 text-white w-${isOpen ? '64' : '20'} transition-all duration-300`}>
      <div className="p-4">
        <button onClick={() => setIsOpen(!isOpen)} className="text-white">
          {isOpen ? 'Close' : 'Open'}
        </button>
      </div>
      <nav className="flex flex-col p-4 space-y-4">
        {menuItems.map((item) => (
          <div key={item.label}>
            <Link
              href="#"
              onClick={() => toggleDropdown(item.label)}
              className="flex items-center justify-between space-x-4"
            >
              <div className="flex items-center">
                {item.icon}
                {isOpen && <span className="ml-4">{item.label}</span>}
              </div>
              {isOpen && (
                <span>
                  {openDropdown === item.label ? (
                    <FiChevronUp size={20} />
                  ) : (
                    <FiChevronDown size={20} />
                  )}
                </span>
              )}
            </Link>
            {openDropdown === item.label && isOpen && (
              <div className="ml-8 mt-2 flex flex-col space-y-2">
                {item.dropdownItems.map((dropdownItem) => (
                  <Link key={dropdownItem.label} href={dropdownItem.href}>
                    {dropdownItem.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Static Settings Option (no dropdown) */}
        <Link href="/settings" className="flex items-center space-x-4">
          <FiSettings size={24} />
          {isOpen && <span>Settings</span>}
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
