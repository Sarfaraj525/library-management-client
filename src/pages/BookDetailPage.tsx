
import { useParams, useNavigate } from "react-router-dom";
import { useGetBookQuery } from "../redux/features/book.api";
import { FaArrowLeft } from "react-icons/fa";

const BookDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: book, isLoading, isError } = useGetBookQuery(id!);

  if (isLoading)
    return (
      <p className="text-center mt-6 text-sm sm:text-base md:text-lg">
        Loading book details...
      </p>
    );
  if (isError || !book)
    return (
      <p className="text-center text-red-600 mt-6 text-sm sm:text-base md:text-lg">
        Error loading book.
      </p>
    );

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 md:p-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-blue-600 hover:underline text-sm sm:text-base md:text-lg"
      >
        <FaArrowLeft /> Back
      </button>

      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6">
        📖 {book.title}
      </h1>

      <div className="space-y-4 text-gray-800 text-sm sm:text-base md:text-lg leading-relaxed">
        <p>
          <strong>Author:</strong> {book.author}
        </p>
        <p>
          <strong>Genre:</strong> {book.genre}
        </p>
        <p>
          <strong>ISBN:</strong> {book.isbn}
        </p>
        <p>
          <strong>Description:</strong> {book.description}
        </p>
        <p>
          <strong>Copies:</strong> {book.copies}
        </p>
        <p>
          <strong>Available:</strong> {book.available ? "Yes ✅" : "No ❌"}
        </p>
      </div>
    </div>
  );
};

export default BookDetailPage;
