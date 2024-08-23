import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Category } from '@/types/Products';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getCategories: builder.query<any, void>({
      query: () => '/categories',
    }),
    createCategory: builder.mutation<any, Partial<Category>>({
      query: (category) => ({
        url: '/categories',
        method: 'POST',
        body: category,
      }),
    }),
    updateCategory: builder.mutation<any, { id: string; category: Partial<Category> }>({
      query: ({ id, category }) => ({
        url: `/categories/${id}`,
        method: 'PUT',
        body: category,
      }),
    }),
    deleteCategory: builder.mutation<any, string>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: 'DELETE',
      }),
    }),
    // Define other endpoints similarly
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  // Export other hooks
} = api;
