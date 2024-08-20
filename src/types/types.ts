// Category type
export interface Category {
    _id: string;
    name: string;
    slug: string;
    thumbnail?: string; // Optional field
    createdAt?: string; // Optional, depending on if you're fetching this from a database
    updatedAt?: string; // Optional, depending on if you're fetching this from a database
  }
  
  export interface Variant {
    name: string;
    price: number;
    _id: string;

   
  }
  
  // export interface ProductVariant {
  //   _id: string;
  //   name: string;
  //   price: number;
  // }
  
  
  
  
  // Product type (if needed)
  export interface Product {
    _id: string;
    name: string;
    slug: string;
    photos: string[];
    description: string;
    metaKey: string;
    price: number;
    discount?: number; // Optional
    stockStatus: boolean;
    status: boolean;
    primaryCategory: string;
    secondaryCategory?: string; // Optional
    tertiaryCategory?: string; // Optional
    variants?: string[]; // Array of Variant IDs
    createdAt?: string; // Optional, depending on if you're fetching this from a database
    updatedAt?: string; // Optional, depending on if you're fetching this from a database
  }
  