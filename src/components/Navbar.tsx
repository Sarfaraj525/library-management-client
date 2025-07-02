import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-gradient-to-r from-indigo-800 via-indigo-600 to-purple-700 px-4 py-3 text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl md:text-3xl font-bold tracking-wide italic">
          📚 MyLibrary
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-4 text-sm md:text-base">
          <Link
            to="/books"
            className="px-4 py-2 rounded-md hover:bg-indigo-900 hover:text-yellow-300 transition-all duration-300 font-medium"
          >
            📖 All Books
          </Link>
          <Link
            to="/create-book"
            className="px-4 py-2 rounded-md hover:bg-indigo-900 hover:text-green-300 transition-all duration-300 font-medium"
          >
            ➕ Add Book
          </Link>
          <Link
            to="/borrow-summary"
            className="px-4 py-2 rounded-md hover:bg-indigo-900 hover:text-pink-300 transition-all duration-300 font-medium"
          >
            📊 Borrow Summary
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          className="md:hidden focus:outline-none text-xl"
          onClick={toggleMenu}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-2 flex flex-col gap-2 px-2 text-sm">
          <Link
            to="/books"
            onClick={toggleMenu}
            className="block px-4 py-2 rounded-md hover:bg-indigo-900 hover:text-yellow-300 transition-all duration-300"
          >
            📖 All Books
          </Link>
          <Link
            to="/create-book"
            onClick={toggleMenu}
            className="block px-4 py-2 rounded-md hover:bg-indigo-900 hover:text-green-300 transition-all duration-300"
          >
            ➕ Add Book
          </Link>
          <Link
            to="/borrow-summary"
            onClick={toggleMenu}
            className="block px-4 py-2 rounded-md hover:bg-indigo-900 hover:text-pink-300 transition-all duration-300"
          >
            📊 Borrow Summary
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
