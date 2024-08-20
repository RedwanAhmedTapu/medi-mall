export interface Category {
    _id: string;
    name: string;
  }
  
  export interface Variant {
    _id: string;
    name: string;
    price: number;
  }
  
  export interface Product {
    _id: string;
    name: string;
    slug: string;
    photos: string[];
    description: string;
    metaKey: string;
    price: number;
    discount?: number;
    stockStatus: boolean;
    status: boolean;
    primaryCategoryId: Category;
    secondaryCategoryId?: Category;
    tertiaryCategoryId?: Category;
    variants?: Variant[];
    __v?: number;
  }
  