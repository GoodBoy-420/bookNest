import { Outlet } from "react-router-dom";

import AuthProvider from "../../providers/AuthProvider.jsx";
import PostProvider from "../../providers/BookProvider.jsx";
import Footer from "./Footer";
import Navbar from "./Navbar";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <AuthProvider>
        <PostProvider>
          <Navbar />
          <main>
            <Outlet />
          </main>
          <Footer />
        </PostProvider>
      </AuthProvider>
    </div>
  );
};

export default MainLayout;
