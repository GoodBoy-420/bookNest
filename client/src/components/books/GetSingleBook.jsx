import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Ratings from "./Ratings";

const GetSingleBook = () => {
  let { bookId } = useParams();
  const [book, setBook] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/book/get/${bookId}`,
        );
        setBook(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBooks();
  }, [bookId]);

  return (
    <div className="p-4 bg-gray-100">
      <div className="lg:max-w-6xl max-w-xl mx-auto">
        <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-8 max-lg:gap-12 max-sm:gap-8">
          <div className="w-full lg:sticky top-0">
            <div className="flex flex-col gap-4">
              <div className="bg-white shadow-sm p-2">
                <img
                  src="https://placehold.co/600x400"
                  alt="Product"
                  className="w-full  aspect-11/8 object-cover object-top"
                />
              </div>
            </div>
          </div>

          <div className="w-full">
            {book && book.length > 0 && (
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-slate-900">
                  {book[0]?.title}
                </h3>

                <div className="flex items-center gap-3 mt-2">
                  <Ratings rating={book[0]?.ratings} />
                  <span className="text-slate-500">|</span>
                  <p className="text-sm text-slate-500">{book[0]?.category}</p>
                  <span className="text-slate-500">|</span>
                  <p className="text-sm text-slate-500">
                    {book[0]?.numReviews} Reviews
                  </p>
                </div>

                <div className="mt-4">
                  <p className="text-slate-500 mt-1 text-sm">
                    {book[0]?.description}
                  </p>
                </div>

                <div className="flex items-center flex-wrap gap-2 mt-6">
                  <h4 className="text-purple-800 text-2xl sm:text-3xl font-semibold">
                    ${book[0]?.price}
                  </h4>
                </div>
              </div>
            )}

            <hr className="my-6 border-gray-300" />

            <div>
              <div className="mt-4 flex flex-wrap gap-4">
                <button
                  type="button"
                  className="px-4 py-3 w-[45%] cursor-pointer border border-gray-300 bg-white hover:bg-slate-50 text-slate-900 text-sm font-medium"
                >
                  Add to cart
                </button>
                {/* <button
                  type="button"
                  className="px-4 py-3 w-[45%] cursor-pointer border border-purple-600 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium"
                >
                  Buy it now
                </button> */}
              </div>
            </div>

            <hr className="my-6 border-gray-300" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetSingleBook;
