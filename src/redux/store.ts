import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./features/bookSlice";
import { bookApi } from "./features/book.api";
// import { bookApi } from './features/book.api' // 👈 Import your RTK Query API

export const store = configureStore({
  reducer: {
    [bookApi.reducerPath]: bookApi.reducer, // 👈 Add RTK Query reducer
    book: bookReducer, // your optional local slice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookApi.middleware), // 👈 Add RTK Query middleware
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
