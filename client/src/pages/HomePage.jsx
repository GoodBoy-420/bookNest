import axios from "axios";
import { useEffect } from "react";

import Search from "../assets/search.svg";
import LatestBooks from "../components/books/FeaturedBooks";
import { useBook } from "../hooks/useBook";

const HomePage = () => {
  const { state, dispatch } = useBook();

  useEffect(() => {
    dispatch({ type: "data_fetching" });

    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/book/get-featured`,
        );
        if (response.status === 200) {
          // ?Success
          dispatch({
            type: "data_fetched",
            data: response.data.data,
          });
        }
      } catch (error) {
        // *Error

        dispatch({
          type: "data_fetch_error",
          error: error.message,
        });
      }
    };

    fetchBooks();
  }, [dispatch]);

  // !Loading
  if (state?.loading) {
    return <div> We are working...</div>;
  }

  return (
    <>
      <section className="flex flex-col items-center justify-center">
        <h1 className="text-4xl md:text-6xl font-semibold text-gray-900 mt-4">
          Discover Your Next Favorite Book
        </h1>
        <p className="max-w-lg text-center text-slate-500 mt-6">
          Explore thousands of books from various genres. Curated just for book
          lovers.
        </p>
        <div className="flex items-center gap-3 max-w-md w-full p-3 m-3">
          <div className="flex items-center w-full border pl-3 gap-2 bg-white border-gray-500/30 h-11.5 rounded-md overflow-hidden">
            <img src={Search} alt="search" width="20px" />
            <input
              type="text"
              placeholder="Search for books"
              className="w-full h-full outline-none text-gray-500 placeholder-gray-500 text-sm"
            />
          </div>
          <button
            type="submit"
            className="bg-primary w-32 h-11.5 rounded-md text-sm text-white"
          >
            Search
          </button>
        </div>
      </section>

      <LatestBooks featuredBooks={state?.books} />
    </>
  );
};

export default HomePage;
