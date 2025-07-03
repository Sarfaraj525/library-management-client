import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./features/bookSlice";
import { bookApi } from "./features/book.api";

export const store = configureStore({
  reducer: {
    [bookApi.reducerPath]: bookApi.reducer,
    book: bookReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookApi.middleware),
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
