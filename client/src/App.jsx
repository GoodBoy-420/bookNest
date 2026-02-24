import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./components/shared/MainLayout";
import BooksPage from "./pages/BooksPage";
import CartPage from "./pages/CartPage";
import ContactPage from "./pages/ContactPage";
import ErrorPage from "./pages/ErrorPage";
import GetSingleBook from "./pages/GetSingleBook";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import RegistrationPage from "./pages/RegistrationPage";
import SuccessPage from "./pages/SuccessPage";
import WishListPage from "./pages/WishListPage";
import ProtectedRoute from "./routes/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "signin",
        element: <LoginPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "books",
        element: <BooksPage />,
      },
      {
        path: "book/:bookId",
        element: <GetSingleBook />,
      },
      {
        path: "signup",
        element: <RegistrationPage />,
      },

      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "wish-list",
        element: <WishListPage />,
      },

      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "profile",
            element: <ProfilePage />,
          },
          {
            path: "success",
            element: <SuccessPage />,
          },
        ],
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
