"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaAngleRight } from "react-icons/fa";

export default function LinknavigationBanner() {
  const pathname = usePathname();
  const [pathArray, setPathArray] = useState([]);

  useEffect(() => {
    if (pathname) {
      const paths = pathname.toString().split("/").filter(Boolean); // Filter out empty values

      setPathArray(["", ...paths]); // Add "" to represent 'Home'
    }
  }, [pathname]);

  if (pathname === "/" || pathname==="/login" ||pathname==="/register"|| pathname==="/admin") {
    return null;
  }

  const createBreadcrumbs = () => {
    let accumulatedPath = ""; // To accumulate the path segments

    return pathArray.map((curElem, index) => {
      accumulatedPath += `${curElem}/`; // Build the path progressively

      // Check if it's the 'Home' link
      if (curElem === "" ) {
        return (
          <span key={index} className="flex items-center">
            <Link href="/" className="text-gray-700 hover:text-blue-600">
              <span>Home</span>
            </Link>
            {index !== pathArray.length - 1 && (
              <FaAngleRight className="mx-1 text-gray-500" />
            )}
          </span>
        );
      }

      // For other path elements
      return (
        <span key={index} className="flex items-center">
          <Link
            href={accumulatedPath}
            className="text-gray-700 hover:text-blue-600"
          >
            <span>{curElem.charAt(0).toUpperCase() + curElem.slice(1)}</span>
          </Link>
          {index !== pathArray.length - 1 && (
            <FaAngleRight className="mx-1 text-gray-500" />
          )}
        </span>
      );
    });
  };

  return (
    <div
      className="relative inner-page-banner bg-cover bg-no-repeat bg-center py-16"
      style={{
        backgroundImage:
          'url("https://radiustheme.com/demo/wordpress/themes/medimall/wp-content/themes/medimall/assets/img/element_13.png"), url("https://radiustheme.com/demo/wordpress/themes/medimall/wp-content/themes/medimall/assets/img/element_14.png")',
        backgroundPosition: "left top, right top",
        backgroundSize: "auto 100px, auto 100px",
      }}
    >
      <div className="container mx-auto">
        <h2 className="banner-title text-3xl font-bold text-start mb-6 px-4">
          {pathArray.length > 0 && pathArray[pathArray.length - 1]
            ? pathArray[pathArray.length - 1].charAt(0).toUpperCase() +
              pathArray[pathArray.length - 1].slice(1)
            : "Home"}
        </h2>

        <div className="main-breadcrumb flex justify-start px-4 gap-x-2 items-center text-sm text-gray-600">
          {createBreadcrumbs()}
        </div>
      </div>
    </div>
  );
}
