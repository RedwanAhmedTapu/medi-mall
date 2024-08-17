import { FaAngleRight } from 'react-icons/fa'; // Import the FaAngleRight icon
import Image from 'next/image';

export default function Banners() {
  const banners = [
    {
      id: 1,
      title: 'Upto 25% Off',
      subtitle: '100% Pure Hand Sanitizer',
      buttonText: 'Shop Now',
      buttonLink: '/shop',
      imageSrc: 'https://radiustheme.com/demo/wordpress/themes/medimall/wp-content/uploads/2022/06/product_26.png',
      backgroundPosition: 'left-bottom',
      hexColor: 'lime',
    },
    {
      id: 2,
      title: 'Special Offer',
      subtitle: 'Medical Equipments',
      buttonText: 'Buy Now',
      buttonLink: '/shop',
      imageSrc: 'https://radiustheme.com/demo/wordpress/themes/medimall/wp-content/uploads/2022/06/product_27.png',
      backgroundPosition: 'right-top',
      hexColor: 'red',
    },
    {
      id: 3,
      title: 'Limited Time',
      subtitle: 'Surgical Masks',
      buttonText: 'Order Today',
      buttonLink: '/shop',
      imageSrc: 'https://radiustheme.com/demo/wordpress/themes/medimall/wp-content/uploads/2022/06/product_28.png',
      backgroundPosition: 'left-bottom',
      hexColor: 'cyan',
    },
  ];

  return (
    <div className="bg-cover bg-center p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="relative p-6 rounded-lg shadow-lg flex flex-col lg:flex-row items-center justify-between"
            style={{
              backgroundImage: `url(https://img.freepik.com/free-vector/wallpaper-with-geometric-shapes-concept_23-2148313528.jpg?t=st=1723876308~exp=1723879908~hmac=460f1d7dee9cb8a51bcef5bda6f77cde45ae95ec67851638b3728c64e292acd3&w=996), linear-gradient(${banner.hexColor}, ${banner.hexColor})`,
              backgroundSize: 'cover, 60px 60px',
              backgroundRepeat: 'no-repeat, no-repeat',
              backgroundPosition: `${banner.backgroundPosition}, ${banner.backgroundPosition}`,
            }}
          >
            <div className="text-center lg:text-left">
              <div className="text-xl font-bold mb-2">{banner.title}</div>
              <h2 className="text-2xl font-semibold mb-4">{banner.subtitle}</h2>
              <a
                href={banner.buttonLink}
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                {banner.buttonText} <FaAngleRight className="inline ml-2" />
              </a>
            </div>
            <div className="mt-4 lg:mt-0">
              <img
                src={banner.imageSrc}
                alt={banner.subtitle}
                width={269}
                height={249}
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
