import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateBookMutation } from "../redux/features/book.api";
import toast from "react-hot-toast";

const CreateBookPage = () => {
  const navigate = useNavigate();
  const [createBook] = useCreateBookMutation();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: 1,
    available: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "copies"
          ? parseInt(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.title.trim() === "" || formData.copies < 0) {
      toast.error("Invalid input. Title and copies are required.");
      return;
    }

    try {
      await createBook(formData).unwrap();
      toast.success("✅ Book created successfully");
      navigate("/");
    } catch {
      toast.error("❌ Failed to create book");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-6 p-4 ">
      <h2 className="text-2xl font-bold mb-4 text-center">➕ Add New Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Author"
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          placeholder="Genre"
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
          placeholder="ISBN"
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-2 rounded"
          rows={3}
        />
        <input
          type="number"
          name="copies"
          value={formData.copies}
          onChange={handleChange}
          placeholder="Number of Copies"
          className="w-full border p-2 rounded"
          min={0}
          required
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="available"
            checked={formData.available}
            onChange={handleChange}
          />
          Available
        </label>
        <button
          type="submit"
          className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default CreateBookPage;
