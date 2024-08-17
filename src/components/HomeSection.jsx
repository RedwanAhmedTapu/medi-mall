"use client";
import React from "react";

const PromoBanner = () => {
  return (
    <section
      className="w-full flex bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://radiustheme.com/demo/wordpress/themes/medimall/wp-content/uploads/2022/06/banner-bg_1.jpg)",
      }}
    >
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 py-16">
        {/* Left column */}
        <div className="flex flex-col md:flex-row">
  <div className="flex flex-col justify-center items-start text-left space-y-4 ml-4 md:ml-12">
    <span className="text-lg md:text-xl p-2 uppercase bg-amber-300 rounded-md text-gray-700">
      100% Premium Quality
    </span>
    <h1 className="text-2xl md:text-3xl font-bold uppercase">Surgical Mask</h1>
    <p className="text-base md:text-lg text-black">3 Layer Protection</p>
    <ul className="space-y-2 ml-4">
      <li className="relative pl-5 font-semibold before:content-['•'] before:text-amber-300 before:absolute before:left-0">
        when annery unknown printer took
      </li>
      <li className="relative font-semibold pl-5 before:content-['•'] before:text-amber-300 before:absolute before:left-0">
        Scrambled it to make attendance type
      </li>
      <li className="relative font-semibold pl-5 before:content-['•'] before:text-amber-300 before:absolute before:left-0">
        Perfect galley of type and
      </li>
    </ul>

    <a
      href="/product/"
      className="inline-block mt-4 md:mt-6 px-4 md:px-6 py-2 bg-blue-600 text-white uppercase font-semibold rounded-md shadow hover:bg-blue-700 transition"
    >
      Shop Now<i className="fas fa-angle-right ml-2"></i>
    </a>
  </div>
  <div className="flex justify-center md:justify-start items-center mt-8 md:mt-0">
    <a href="/product/">
      <img
        src="https://radiustheme.com/demo/wordpress/themes/medimall/wp-content/uploads/2022/06/product_1-1.png"
        alt="Surgical Mask"
        className="max-w-full h-auto object-contain animate-fadeInRight"
      />
    </a>
  </div>
</div>


        {/* Right column */}
        <div className="">
          <div className=" flex justify-evenly items-center p-2">
            <div className="flex flex-col justify-center items-start text-left space-y-4">
              <h3 className="text-3xl font-bold uppercase">Ekta Nebulizer</h3>
              <p className="text-lg uppercase">Compressor</p>
              <a
                href="/product/"
                className="inline-block mt-6 px-6 py-2 bg-blue-600 text-white uppercase font-semibold rounded-md shadow hover:bg-blue-700 transition"
              >
                Shop Now<i className="fas fa-angle-right ml-2"></i>
              </a>
            </div>
            <div className="flex justify-start items-center mb-16">
              <a href="http://medishopdev.local/shop/">
                <img
                  src="https://radiustheme.com/demo/wordpress/themes/medimall/wp-content/uploads/2022/06/product_2-1.png"
                  alt="Nebulizer"
                  className="max-w-full h-auto object-contain"
                />
              </a>
            </div>
          </div>
          <div className=" flex justify-evenly items-center p-2">
            <div className="flex justify-start items-center mt-16">
              <a href="/product/">
                <img
                  src="https://radiustheme.com/demo/wordpress/themes/medimall/wp-content/uploads/2022/06/product_12-1.png"
                  alt="Ancohol Gel"
                  className="max-w-full h-auto object-contain"
                />
              </a>
            </div>
            <div className="flex flex-col justify-center items-start text-left space-y-4 mt-8">
              <h3 className="text-3xl font-bold uppercase">Ancohol Gel</h3>
              <p className="text-lg uppercase">100% Protection</p>
              <a
                href="/product/"
                className="inline-block mt-6 px-6 py-2 bg-blue-600 text-white uppercase font-semibold rounded-md shadow hover:bg-blue-700 transition"
              >
                Shop Now<i className="fas fa-angle-right ml-2"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
