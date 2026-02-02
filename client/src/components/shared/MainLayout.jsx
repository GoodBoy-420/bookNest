import { Outlet } from "react-router-dom";

import PostProvider from "../../providers/BookProvider.jsx";
import Footer from "./Footer";
import Navbar from "./Navbar";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <PostProvider>
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </PostProvider>
    </div>
  );
};

export default MainLayout;
