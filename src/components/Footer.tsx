const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-800 via-indigo-600 to-purple-700 text-white py-6 mt-12 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sm sm:text-base md:text-lg font-light tracking-wide">
          📚 Powered by{" "}
          <span className="font-semibold text-yellow-300 hover:underline cursor-pointer transition-all">
            Minimal Library Management System
          </span>
        </p>
        <p className="mt-2 text-xs sm:text-sm md:text-base opacity-80">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
