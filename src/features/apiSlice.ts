import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Category } from '../types/types';
import { Variant } from '../types/types';
import { Product } from '../types/types';
import { ShippingAddress } from '../types/ShippingAddress';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  endpoints: (builder) => ({
    // Fetch all categories
    getCategories: builder.query<Category[], void>({
      query: () => '/categories/get-categories',
    }),

    // Add a new category
    addCategory: builder.mutation<void, Partial<Category>>({
      query: (newCategory) => ({
        url: '/categories/create-categories',
        method: 'POST',
        body: newCategory,
      }),
    }),

    // Fetch all variants
    getVariants: builder.query<Variant[], void>({
      query: () => '/variant/get-variants',
    }),

    // Add a new variant
    addVariant: builder.mutation<void, Partial<Variant>>({
      query: (newVariant) => ({
        url: '/variant/add-variants',
        method: 'POST',
        body: newVariant,
      }),
    }),

    // Add a new product
    addProduct: builder.mutation<void, Partial<Product>>({
      query: (newProduct) => ({
        url: '/product/add-products',
        method: 'POST',
        body: newProduct,
      }),
    }),

    // Fetch all products
    getProducts: builder.query<Product[], void>({
      query: () => '/product/get-products',
    }),
    getShippingAddresses: builder.query<ShippingAddress[], void>({
      query: () => '/shipping/get-addresses',
    }),

    // Add a new shipping address
    addShippingAddress: builder.mutation<void, Partial<ShippingAddress>>({
      query: (newAddress) => ({
        url: '/shipping/add-address',
        method: 'POST',
        body: newAddress,
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useGetVariantsQuery,
  useAddVariantMutation,
  useAddProductMutation,
  useGetProductsQuery,
  useGetShippingAddressesQuery,
  useAddShippingAddressMutation,
} = apiSlice;
