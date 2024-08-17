
"use client"
import Image from "next/image";
import HomeSection from "@/components/HomeSection";
import ProductCategories from "@/components/ProductCategories";
import HomeProductShow from "../components/HomeProductShow";
import BannerList from "@/components/BannerList";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col gap-y-16 min-h-screen ">
      <HomeSection/>
      <ProductCategories/>
      <HomeProductShow/>
      <BannerList/>
    </main>
  );
}
