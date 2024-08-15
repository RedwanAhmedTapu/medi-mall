// src/types/Product.ts
export interface ProductVariant {
    name: string;
    price: number;
  }
  
  export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl: string;
    variants?: ProductVariant[];
  }
  