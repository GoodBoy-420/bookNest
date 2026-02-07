import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import BookList from "../components/books/BookList";
import Pagination from "../components/Pagination";
import { useBook } from "../hooks/useBook";

const BooksPage = () => {
  const { state, dispatch } = useBook();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const keyword = searchParams.get("keyword") || "";
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const categories = searchParams.get("categories");
  const author = searchParams.get("author");

  useEffect(() => {
    const fetchBooks = async () => {
      dispatch({ type: "data_fetching" });

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/book/get-all`,
          {
            params: {
              page,
              keyword,
              minPrice,
              maxPrice,
              categories,
              author,
            },
          },
        );

        dispatch({
          type: "data_fetched",
          data: response.data.data,
        });
      } catch (error) {
        dispatch({
          type: "data_fetch_error",
          error: error.message,
        });
      }
    };

    fetchBooks();
  }, [page, keyword, minPrice, maxPrice, categories, author]);

  const updateParams = (newParams) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      ...newParams,
      page: 1,
    });
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="mb-6">
          <input
            value={keyword}
            onChange={(e) => updateParams({ keyword: e.target.value })}
            type="text"
            placeholder="Search books, authors..."
            className="w-full md:w-1/2 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <select
            multiple
            className="px-4 py-2 border rounded-lg"
            onChange={(e) =>
              updateParams({
                categories: [...e.target.selectedOptions]
                  .map((o) => o.value)
                  .join(","),
              })
            }
          >
            {state?.books?.map((book) => {
              <option key={book._id} value={book.category}>
                {book.category}
              </option>;
            })}
          </select>

          <select
            onChange={(e) => updateParams({ author: e.target.value })}
            className="px-4 py-2 border rounded-lg"
          >
            {state?.books?.map((book) => {
              <option key={book._id} value={book.author}>
                {book.author}
              </option>;
            })}
          </select>

          <input
            type="range"
            min="0"
            max="100"
            onChange={(e) =>
              updateParams({ minPrice: 0, maxPrice: e.target.value })
            }
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {state?.books?.map((book) => (
            <BookList key={book._id} book={book} />
          ))}

          <Pagination
            page={state?.page}
            totalPages={state?.totalPages}
            onPageChange={(p) =>
              setSearchParams({ ...Object.fromEntries(searchParams), page: p })
            }
          />
        </div>
      </section>
    </div>
  );
};

export default BooksPage;
