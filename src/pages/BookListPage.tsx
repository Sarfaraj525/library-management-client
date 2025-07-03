import {
  useGetBooksQuery,
  useDeleteBookMutation,
} from "../redux/features/book.api";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaBookReader, FaEye } from "react-icons/fa";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const BookListPage = () => {
  const { data, isLoading, isError } = useGetBooksQuery();
  const [deleteBook] = useDeleteBookMutation();
  const navigate = useNavigate();

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This book will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBook(id)
          .unwrap()
          .then(() => {
            toast.success("Book deleted");
            Swal.fire("Deleted!", "The book has been deleted.", "success");
          })
          .catch(() => {
            toast.error("Delete failed");
            Swal.fire("Error!", "Something went wrong.", "error");
          });
      }
    });
  };

  const books = Array.isArray(data) ? data : [];

  if (isLoading) return <p className="text-center mt-4">Loading books...</p>;
  if (isError)
    return (
      <p className="text-center text-red-600 mt-4">Error loading books.</p>
    );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl md:text-2xl font-semibold">📚 Book List</h1>
        <button
          onClick={() => navigate("/create-book")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          + Add Book
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300 text-sm md:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1 text-left">Title</th>
              <th className="border px-2 py-1 text-left hidden sm:table-cell">
                Author
              </th>
              <th className="border px-2 py-1 text-left hidden md:table-cell">
                Genre
              </th>
              <th className="border px-2 py-1 text-left hidden md:table-cell">
                ISBN
              </th>
              <th className="border px-2 py-1 text-center hidden sm:table-cell">
                Copies
              </th>
              <th className="border px-2 py-1 text-center hidden sm:table-cell">
                Available
              </th>
              <th className="border px-2 py-1 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((b) => (
              <tr key={b._id} className="border-t hover:bg-gray-50">
                <td className="border px-2 py-1">{b.title}</td>
                <td className="border px-2 py-1 hidden sm:table-cell">
                  {b.author}
                </td>
                <td className="border px-2 py-1 hidden md:table-cell">
                  {b.genre}
                </td>
                <td className="border px-2 py-1 hidden md:table-cell">
                  {b.isbn}
                </td>
                <td className="border px-2 py-1 text-center hidden sm:table-cell">
                  {b.copies}
                </td>
                <td className="border px-2 py-1 text-center hidden sm:table-cell">
                  {b.available ? "✅" : "❌"}
                </td>
                <td className="border px-2 py-1">
                  <div className="flex justify-center gap-2">
                    <FaEye
                      className="cursor-pointer text-purple-600 hover:text-purple-800"
                      onClick={() => navigate(`/books/${b._id}`)}
                    />
                    <FaEdit
                      className="cursor-pointer text-blue-600 hover:text-blue-800"
                      onClick={() => navigate(`/edit-book/${b._id}`)}
                    />
                    <FaTrash
                      className="cursor-pointer text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(b._id!)}
                    />
                    <FaBookReader
                      className="cursor-pointer text-green-600 hover:text-green-800"
                      onClick={() => navigate(`/borrow/${b._id}`)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookListPage;
