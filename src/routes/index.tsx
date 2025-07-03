import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import BookListPage from "@/pages/BookListPage";
import CreateBookPage from "@/pages/CreateBookPage";
import EditBookPage from "@/pages/EditBookPage";
import BookDetailPage from "@/pages/BookDetailPage";
import BorrowBookPage from "@/pages/BorrowBookPage";
import BorrowSummaryPage from "@/pages/BorrowSummaryPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, path: "/", element: <BookListPage /> },
      { path: "books", element: <BookListPage /> },
      { path: "books/:id", element: <BookDetailPage /> },
      { path: "create-book", element: <CreateBookPage /> },
      { path: "edit-book/:id", element: <EditBookPage /> },
      { path: "borrow/:bookId", element: <BorrowBookPage /> },
      { path: "borrow-summary", element: <BorrowSummaryPage /> },
    ],
  },
]);

export default router;
