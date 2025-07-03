import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 px-4 py-6 bg-gray-50">
        <Outlet />
      </main>
      <Footer />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default Layout;
