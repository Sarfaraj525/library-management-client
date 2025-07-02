import { useParams, useNavigate } from "react-router-dom";
import {
  useGetBookQuery,
  useUpdateBookMutation,
} from "../redux/features/book.api";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const EditBookPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: book, isLoading, isError } = useGetBookQuery(id!);
  const [updateBook] = useUpdateBookMutation();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: 0,
  });

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        genre: book.genre,
        isbn: book.isbn,
        description: book.description,
        copies: book.copies,
      });
    }
  }, [book]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "copies" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.copies < 0) {
      toast.error("Copies cannot be negative!");
      return;
    }

    const updatedData = {
      ...formData,
      available: formData.copies > 0,
    };

    try {
      await updateBook({ id: id!, data: updatedData }).unwrap();
      toast.success("Book updated successfully");
      navigate("/books");
    } catch {
      toast.error("Failed to update book");
    }
  };

  if (isLoading)
    return (
      <p className="text-center mt-6 text-sm sm:text-base md:text-lg">
        Loading book...
      </p>
    );
  if (isError || !book)
    return (
      <p className="text-center text-red-600 mt-6 text-sm sm:text-base md:text-lg">
        Book not found
      </p>
    );

  return (
    <div className="max-w-xl mx-auto mt-8 px-4 sm:px-6 md:px-8">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center">
        ✏️ Edit Book
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full border p-2 rounded text-sm sm:text-base"
          required
        />
        <input
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Author"
          className="w-full border p-2 rounded text-sm sm:text-base"
          required
        />
        <input
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          placeholder="Genre"
          className="w-full border p-2 rounded text-sm sm:text-base"
          required
        />
        <input
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
          placeholder="ISBN"
          className="w-full border p-2 rounded text-sm sm:text-base"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-2 rounded text-sm sm:text-base"
          rows={4}
        />
        <input
          type="number"
          name="copies"
          value={formData.copies}
          onChange={handleChange}
          placeholder="Number of Copies"
          className="w-full border p-2 rounded text-sm sm:text-base"
          min={0}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm sm:text-base"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditBookPage;
