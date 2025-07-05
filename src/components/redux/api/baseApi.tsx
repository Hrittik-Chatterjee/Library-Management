import type { BorrowSummaryResponse } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
  }),
  tagTypes: ["Books", "Borrow", "SingleBook"],
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: (filter) => (filter ? `/books?filter=${filter}` : "/books"),
      providesTags: ["Books"],
    }),
    getBookById: builder.query({
      query: (id) => `/books/${id}`,
      providesTags: ["SingleBook"],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books", "SingleBook"],
    }),
    updateBook: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Books", "SingleBook"],
    }),
    addBook: builder.mutation({
      query: (data) => ({
        url: "/books",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Books", "SingleBook"],
    }),

    //borrow routes
    getBorrowSummery: builder.query<BorrowSummaryResponse, void>({
      query: () => "/borrow",
      providesTags: ["Borrow"],
    }),
    borrowBook: builder.mutation({
      query: (data) => ({
        url: "/borrow",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Borrow", "Books", "SingleBook"],
    }),
  }),
});

export const {
  useGetBorrowSummeryQuery,
  useBorrowBookMutation,
  useGetBooksQuery,
  useGetBookByIdQuery,
  useDeleteBookMutation,
  useUpdateBookMutation,
  useAddBookMutation,
} = baseApi;
