'use client'
import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Footer() {
 const pathname=usePathname();

 if(pathname==="/admin"){
  return null;
 }

    const currentYear = new Date().getFullYear();

  return (
    <footer className="relative top-10 overflow-hidden">
      <div className="bg-gray-900 text-white relative overflow-hidden py-10 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            <div className="wow fadeInUp bg-blue-900 p-4 rounded-sm" data-wow-delay="200ms" data-wow-duration="800ms">
              <div>
                <img
                  src="https://radiustheme.com/demo/wordpress/themes/medimall/wp-content/uploads/2022/06/logo-light.svg"
                  alt="Logo"
                  width={227}
                  height={51}
                  className="mb-4"
                />
                <p className="text-gray-400">
                  Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat nostrud exercitation.
                </p>
                <div className="mt-4">
                  <span className="block text-lg font-semibold">Our Help Line:</span>
                  <a href="tel:0020500-98-000" className="block text-blue-400 text-lg">0020 500 -98- 000</a>
                </div>
                <ul className="mt-4 space-y-1 text-gray-400">
                  <li>Monday - Friday: 9:00 - 20:00</li>
                  <li>Saturday: 11:00 - 15:00</li>
                  <li>
                    <a href="mailto:demo@medimalldemo.com" className="text-blue-400">demo@medimalldemo.com</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="wow fadeInUp" data-wow-delay="400ms" data-wow-duration="800ms">
              <h3 className="text-xl font-bold mb-4">Information</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Delivery</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Secure Payment</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Sitemap</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Stores</a></li>
              </ul>
            </div>

            <div className="wow fadeInUp" data-wow-delay="600ms" data-wow-duration="800ms">
              <h3 className="text-xl font-bold mb-4">Custom Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Legal Notice</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Prices Drop</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">New Products</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Best Sales</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Login</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">My account</a></li>
              </ul>
            </div>

            <div className="wow fadeInUp" data-wow-delay="800ms" data-wow-duration="800ms">
              <h3 className="text-xl font-bold mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">You may unsubscribe at any moment. For that purpose, please find our contact.</p>
              <form className="flex flex-col space-y-4">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="p-2 rounded-md bg-gray-800 text-white"
                  placeholder="Enter your email"
                  required
                />
                <button type="submit" className="p-2 bg-blue-600 rounded-md text-white hover:bg-blue-700">Submit Now</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 py-4 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400">
            <p className="mb-2 md:mb-0">{currentYear} © all right reserved by <a href="#" className="text-blue-400">Medi-mall</a></p>
            <div className="flex justify-center md:justify-end">
              <img
                src="https://radiustheme.com/demo/wordpress/themes/medimall/wp-content/themes/medimall/assets/img/payments.png"
                alt="Payments"
                width={286}
                height={23}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
