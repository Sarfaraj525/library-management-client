import { BASE_URL } from "@/lib/env";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Book {
  _id?: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
}

export interface BorrowSummary {
  title: string;
  isbn: string;
  totalQuantity: number;
}

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Books", "Borrow"],
  endpoints: (b) => ({
    // GET ALL BOOKS
    getBooks: b.query<Book[], void>({
      query: () => "/books",
      transformResponse: (response: {
        success: boolean;
        message: string;
        books: Book[];
      }) => {
        return response.books;
      },
      providesTags: ["Books"],
    }),

    // GET SINGLE BOOK (Fixed!)
    getBook: b.query<Book, string>({
      query: (id) => `/books/${id}`,
      transformResponse: (response: {
        success: boolean;
        message: string;
        book: Book;
      }) => {
        return response.book;
      },
      providesTags: (_res, _err, id) => [{ type: "Books", id }],
    }),

    // CREATE BOOK
    createBook: b.mutation<Book, Partial<Book>>({
      query: (body) => ({ url: "/books", method: "POST", body }),
      invalidatesTags: ["Books"],
    }),

    // UPDATE BOOK
    updateBook: b.mutation<Book, { id: string; data: Partial<Book> }>({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Books"],
    }),

    // DELETE BOOK
    deleteBook: b.mutation<{ success: boolean }, string>({
      query: (id) => ({ url: `/books/${id}`, method: "DELETE" }),
      invalidatesTags: ["Books"],
    }),

    // BORROW BOOK
    borrowBook: b.mutation<
      void,
      { book: string; quantity: number; dueDate: string }
    >({
      query: (body) => ({ url: "/borrow", method: "POST", body }),
      invalidatesTags: ["Books", "Borrow"],
    }),

    // BORROW SUMMARY
    getBorrowSummary: b.query<BorrowSummary[], void>({
      query: () => "/borrow",
      transformResponse: (response: {
        success: boolean;
        message: string;
        borrowSummary: BorrowSummary[];
      }) => {
        return response.borrowSummary;
      },
      providesTags: ["Borrow"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useBorrowBookMutation,
  useGetBorrowSummaryQuery,
} = bookApi;
