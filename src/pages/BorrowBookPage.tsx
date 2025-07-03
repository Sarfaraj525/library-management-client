import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetBookQuery,
  useBorrowBookMutation,
} from "../redux/features/book.api";
import toast from "react-hot-toast";

const BorrowBookPage = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const { data: book, isLoading, isError } = useGetBookQuery(bookId!);
  const [borrowBook, { isLoading: isBorrowing }] = useBorrowBookMutation();

  const [quantity, setQuantity] = useState<number>(1);
  const [dueDate, setDueDate] = useState<string>("");

  useEffect(() => {
    if (book) {
      setQuantity(1);
    }
  }, [book]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!book) return;

    if (quantity <= 0 || quantity > book.copies) {
      toast.error(`Quantity must be between 1 and ${book.copies}`);
      return;
    }

    if (!dueDate) {
      toast.error("Please select a due date");
      return;
    }

    try {
      await borrowBook({ book: book._id!, quantity, dueDate }).unwrap();
      toast.success("✅ Book borrowed successfully");
      navigate("/borrow-summary");
    } catch {
      toast.error("❌ Failed to borrow book");
    }
  };

  if (isLoading)
    return <p className="text-center mt-4">Loading book data...</p>;
  if (isError || !book)
    return <p className="text-center text-red-600 mt-4">Book not found.</p>;

  return (
    <div className="max-w-md mx-auto mt-6 p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">📖 Borrow Book: {book.title}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">
            Quantity (max {book.copies}):
          </label>
          <input
            type="number"
            min={1}
            max={book.copies}
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Due Date:</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full border p-2 rounded"
            required
            min={new Date().toISOString().split("T")[0]}
          />
        </div>
        <button
          type="submit"
          disabled={isBorrowing}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition disabled:opacity-50"
        >
          {isBorrowing ? "Borrowing..." : "Borrow Book"}
        </button>
      </form>
    </div>
  );
};

export default BorrowBookPage;
