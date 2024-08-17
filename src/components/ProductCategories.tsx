'use client'
import React from 'react';
import Link from 'next/link';

const ProductCategories = () => {
  const categories = [
    {
      title: 'Surgical Mask',
      imageUrl: 'https://radiustheme.com/demo/wordpress/themes/medimall/wp-content/uploads/2022/06/cat_8.png',
      link: '/product/surgical-mask/',
      delay: '200ms',
    },
    {
      title: 'Safety Guard',
      imageUrl: 'https://radiustheme.com/demo/wordpress/themes/medimall/wp-content/uploads/2022/06/cat_5.png',
      link: '/product/safety-guard/',
      delay: '300ms',
    },
    {
      title: 'Pharmacy',
      imageUrl: 'https://radiustheme.com/demo/wordpress/themes/medimall/wp-content/uploads/2022/06/cat_3.png',
      link: '/product/pharmacy/',
      delay: '400ms',
    },
    {
      title: 'Nutritions',
      imageUrl: 'https://radiustheme.com/demo/wordpress/themes/medimall/wp-content/uploads/2022/06/cat_9.png',
      link: '/product/nutritions/',
      delay: '500ms',
    },
    {
      title: 'Medkits',
      imageUrl: 'https://radiustheme.com/demo/wordpress/themes/medimall/wp-content/uploads/2022/06/product_13.png',
      link: '/product/medkits/',
      delay: '600ms',
    },
    {
      title: 'Medicine',
      imageUrl: 'https://radiustheme.com/demo/wordpress/themes/medimall/wp-content/uploads/2022/06/cat_4.png',
      link: '/product/medicine/',
      delay: '700ms',
    },
    {
      title: 'Hand Gloves',
      imageUrl: 'https://radiustheme.com/demo/wordpress/themes/medimall/wp-content/uploads/2022/06/cat_1.png',
      link: '/product/hand-gloves/',
      delay: '800ms',
    },
    {
      title: 'Equipments',
      imageUrl: 'https://radiustheme.com/demo/wordpress/themes/medimall/wp-content/uploads/2022/06/cat_7.png',
      link: '/product/equipments/',
      delay: '900ms',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-8 gap-4 p-4">
      {categories.map((category, index) => (
        <div
          key={index}
          className={`rt-cat-item wow fadeInUp animated`}
          data-wow-delay={category.delay}
          data-wow-duration="1200ms"
          style={{ visibility: 'visible', animationDuration: '1200ms', animationDelay: category.delay, animationName: 'fadeInUp' }}
        >
          <div className="">
            <div className="item-img flex items-center justify-center mx-auto">
              <a href={category.link}>
                <img
                  loading="lazy"
                  decoding="async"
                  width="400"
                  height="300"
                  src={category.imageUrl}
                  className=" w-32 h-32   rounded-full bg-slate-100"
                  alt={category.title}
                />
              </a>
            </div>
            <div className="item-content text-center mt-4">
              <h3 className="item-title text-xl font-semibold text-gray-700 text-capitalize">
                <Link href={category.link} className="hover:text-blue-600 transition text-sm">
                  {category.title}
                </Link>
              </h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCategories;
