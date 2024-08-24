import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const brands = [
  // {
  //   title: 'Aritoco',
  //   subtitle: 'Medicine',
  //   imageUrl: 'https://radiustheme.com/demo/wordpress/themes/medimall/wp-content/uploads/2022/06/brand-preview_4.jpg',
  //   logoUrl: 'https://radiustheme.com/demo/wordpress/themes/medimall/wp-content/uploads/2022/06/brand_4.png',
  // },
  {
    title: "Medicone",
    subtitle: "Born For Medicine",
    imageUrl:
      "https://radiustheme.com/demo/wordpress/themes/medimall/wp-content/uploads/2022/06/brand-preview_4.jpg",
    logoUrl:
      "https://radiustheme.com/demo/wordpress/themes/medimall/wp-content/uploads/2022/06/brand_4.png",
  },
  {
    title: "PharmaPlus",
    subtitle: "Your Health, Our Priority",
    imageUrl:
      "https://radiustheme.com/demo/wordpress/themes/medimall/wp-content/uploads/2022/06/brand-preview_5.jpg",
    logoUrl:
      "https://radiustheme.com/demo/wordpress/themes/medimall/wp-content/uploads/2022/06/brand_5.png",
  },
  {
    title: "HealthMax",
    subtitle: "Maximum Care, Maximum Health",
    imageUrl:
      "https://radiustheme.com/demo/wordpress/themes/medimall/wp-content/uploads/2022/06/brand-preview_6.jpg",
    logoUrl:
      "https://radiustheme.com/demo/wordpress/themes/medimall/wp-content/uploads/2022/06/brand_6.png",
  },
  {
    title: "CureWell",
    subtitle: "Trust in Every Pill",
    imageUrl:
      "https://radiustheme.com/demo/wordpress/themes/medimall/wp-content/uploads/2022/06/brand-preview_7.jpg",
    logoUrl:
      "https://radiustheme.com/demo/wordpress/themes/medimall/wp-content/uploads/2022/06/brand_7.png",
  },
  {
    title: "MediCare",
    subtitle: "Caring for Life",
    imageUrl:
      "https://radiustheme.com/demo/wordpress/themes/medimall/wp-content/uploads/2022/06/brand-preview_8.jpg",
    logoUrl:
      "https://radiustheme.com/demo/wordpress/themes/medimall/wp-content/uploads/2022/06/brand_8.png",
  },
  {
    title: "LifeCare",
    subtitle: "Dedicated to Your Well-being",
    imageUrl:
      "https://radiustheme.com/demo/wordpress/themes/medimall/wp-content/uploads/2022/06/brand-preview_9.jpg",
    logoUrl:
      "https://radiustheme.com/demo/wordpress/themes/medimall/wp-content/uploads/2022/06/brand_9.png",
  },
  {
    title: "WellnessRx",
    subtitle: "Prescription for a Better Life",
    imageUrl:
      "https://radiustheme.com/demo/wordpress/themes/medimall/wp-content/uploads/2022/06/brand-preview_10.jpg",
    logoUrl:
      "https://radiustheme.com/demo/wordpress/themes/medimall/wp-content/uploads/2022/06/brand_10.png",
  },
  {
    title: "PharmaCare",
    subtitle: "Care Beyond Medicine",
    imageUrl:
      "https://radiustheme.com/demo/wordpress/themes/medimall/wp-content/uploads/2022/06/brand-preview_11.jpg",
    logoUrl:
      "https://radiustheme.com/demo/wordpress/themes/medimall/wp-content/uploads/2022/06/brand_11.png",
  },
  {
    title: "VitalMed",
    subtitle: "Your Partner in Health",
    imageUrl:
      "https://radiustheme.com/demo/wordpress/themes/medimall/wp-content/uploads/2022/06/brand-preview_12.jpg",
    logoUrl:
      "https://radiustheme.com/demo/wordpress/themes/medimall/wp-content/uploads/2022/06/brand_12.png",
  },
  {
    title: "MediOne",
    subtitle: "One Source, Infinite Care",
    imageUrl:
      "https://radiustheme.com/demo/wordpress/themes/medimall/wp-content/uploads/2022/06/brand-preview_13.jpg",
    logoUrl:
      "https://radiustheme.com/demo/wordpress/themes/medimall/wp-content/uploads/2022/06/brand_13.png",
  },
  {
    title: "PharmEase",
    subtitle: "Medicine Made Easy",
    imageUrl:
      "https://radiustheme.com/demo/wordpress/themes/medimall/wp-content/uploads/2022/06/brand-preview_14.jpg",
    logoUrl:
      "https://radiustheme.com/demo/wordpress/themes/medimall/wp-content/uploads/2022/06/brand_14.png",
  },
];

export default function BrandsSection() {
  return (
    <section className="w-full px-4 py-10 bg-gray-50">
      <div className="w-full mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Popular Brands</h2>
            <span className="text-gray-600">
              Perspiciatis unde omnis iste natus error sit voluptatem
            </span>
          </div>
          <div className="relative flex items-center justify-between w-28 h-28  ">
            <button
              title="Previous"
              className="swiper-button-prev  flex items-center justify-center  rounded-full bg-gray-100 text-gray-900 hover:bg-gray-200 transition duration-200"
            ></button>
            <button
              title="Next"
              className="swiper-button-next flex items-center justify-center rounded-full bg-gray-100 text-gray-900 hover:bg-gray-200 transition duration-200"
            ></button>
          </div>
        </div>
        <Swiper
          spaceBetween={30}
          slidesPerView={1} // Default for mobile
          breakpoints={{
            640: {
              slidesPerView: 2, // Tablet
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3, // Small laptop
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4, // Small laptop
              spaceBetween: 30,
            },
            1280: {
              slidesPerView: 5, // Laptop
              spaceBetween: 30,
            },
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          modules={[Navigation]}
          speed={500}
        >
          {brands.map((brand, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-64 shadow-sm rounded-md overflow-hidden">
                <img
                  src={brand.imageUrl}
                  alt={brand.title}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 flex items-center justify-center">
                  <div className="relative top-24 flex w-full h-16 bg-white rounded-lg items-center p-2">
                    <img
                      src={brand.logoUrl}
                      alt={`${brand.title} logo`}
                      className="w-12 h-12 mr-2"
                    />
                    <div className="flex flex-col">
                      <h3 className="text-slate-900 font-semibold text-sm">
                        {brand.title}
                      </h3>
                      <p className="text-gray-700 text-xs">{brand.subtitle}</p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
