import {
  fetchBaseQuery,
  createApi,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "@/store/store";
import { Category, Product, Variant } from "../types/types";
import { ShippingAddress } from "../types/ShippingAddress";
import { setToken, clearToken } from "@/features/userSlice"; // Import setToken from your userSlice

// Base Query Setup
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
  credentials: "include",
});

// Token Refreshing Logic
const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: any,
  extraOptions: any
) => {
  // Execute the base query
  let result = await baseQuery(args, api, extraOptions);

  // Handle non-JSON responses (parsing errors)
  if (result.error && result.error.status === "PARSING_ERROR") {
    // console.log("Parsing error, response is likely not JSON:", result.error);

    // Manually handle status for forbidden or unauthorized errors
    const status = (result.error as FetchBaseQueryError).status;

    if (
      status === 401 ||
      status === 403 ||
      result.error.originalStatus === 403
    ) {
      api.dispatch(clearToken());
    } else {
      const refreshResult = await baseQuery(
        {
          url: "/auth/refresh-token",
          method: "POST",
          credentials: "include",
        },
        api,
        extraOptions
      );
      console.log(refreshResult, "refreshresult");
      if (refreshResult.data) {
        const newAccessToken = (refreshResult.data as { accessToken: string })
          .accessToken;
        console.log(newAccessToken, "new");

        api.dispatch(setToken(newAccessToken));
        result = await baseQuery(args, api, extraOptions); // Retry original request
      }
    }
  } else if (result.error && result.error.status) {
    const status = result.error.status;
    console.log(status, "status");

    // Handle 401 or 403 errors
    if (status === 401 || status === 403) {
      const refreshResult = await baseQuery(
        {
          url: "/auth/refresh-token",
          method: "POST",
          credentials: "include",
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        const newAccessToken = (refreshResult.data as { accessToken: string })
          .accessToken;
        api.dispatch(setToken(newAccessToken));

        result = await baseQuery(args, api, extraOptions); // Retry original request
      } else {
        api.dispatch(clearToken());
      }
    }
  }

  return result;
};

// API Slice Definition
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // Mutation for user login
    loginUser: builder.mutation<
      { accessToken: string },
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    // Query for fetching categories
    getCategories: builder.query<Category[], void>({
      query: () => "/categories/get-categories",
    }),
    // Mutation for adding a category
    addCategory: builder.mutation<void, Partial<Category>>({
      query: (newCategory) => ({
        url: "/categories/create-categories",
        method: "POST",
        body: newCategory,
      }),
    }),
    // Query for fetching variants
    getVariants: builder.query<Variant[], void>({
      query: () => "/variant/get-variants",
    }),
    // Mutation for adding a variant
    addVariant: builder.mutation<void, Partial<Variant>>({
      query: (newVariant) => ({
        url: "/variant/add-variants",
        method: "POST",
        body: newVariant,
      }),
    }),
    // Mutation for adding a product
    addProduct: builder.mutation<void, Partial<Product>>({
      query: (newProduct) => ({
        url: "/product/add-products",
        method: "POST",
        body: newProduct,
      }),
    }),
    // Query for fetching products
    getProducts: builder.query<Product[], void>({
      query: () => "/product/get-products",
    }),
    // Query for fetching shipping addresses
    getShippingAddresses: builder.query<ShippingAddress[], void>({
      query: () => "/shipping/get-addresses",
    }),
    // Mutation for adding a shipping address
    addShippingAddress: builder.mutation<void, Partial<ShippingAddress>>({
      query: (newAddress) => ({
        url: "/shipping/add-address",
        method: "POST",
        body: newAddress,
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useLoginUserMutation,
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useGetVariantsQuery,
  useAddVariantMutation,
  useAddProductMutation,
  useGetProductsQuery,
  useGetShippingAddressesQuery,
  useAddShippingAddressMutation,
} = apiSlice;
