import { useBook } from "../hooks/useBook";

const BooksPage = () => {
  const { state } = useBook();

  console.log(state?.books);

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search books, authors..."
            className="w-full md:w-1/2 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <select className="px-4 py-2 border rounded-lg">
            <option>All Categories</option>
            <option>Fiction</option>
            <option>Non-Fiction</option>
            <option>Science</option>
            <option>Fantasy</option>
          </select>

          <select className="px-4 py-2 border rounded-lg">
            <option>All Authors</option>
            <option>Author A</option>
            <option>Author B</option>
            <option>Author C</option>
          </select>

          <select className="px-4 py-2 border rounded-lg">
            <option>Any Price</option>
            <option>Under $10</option>
            <option>$10 - $20</option>
            <option>Above $20</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="flex flex-col bg-white shadow-md w-72">
              <img
                className="w-72 h-48 object-cover"
                src="https://images.unsplash.com/photo-1657560566744-06d0b69f6647?q=80&w=600&auto=format&fit=crop"
                alt="image"
              />
              <div className="p-4 text-sm">
                <p className="text-slate-600">$ 29.00</p>
                <p className="text-slate-800 text-base font-medium my-1.5">
                  Chris Jordan
                </p>
                <p className="text-slate-500">
                  Looks amazing out of the box. I barely had to customize
                  anything.
                </p>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <button className="bg-slate-100 text-slate-600 py-2">
                    Add to cart
                  </button>
                  <button className="bg-slate-800 text-white py-2">
                    Buy now
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="col-span-full flex justify-center">
            <div className="flex items-center justify-between w-full max-w-80 text-gray-500 font-medium">
              <button
                type="button"
                aria-label="prev"
                className="rounded-full bg-slate-200/50"
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.499 12.85a.9.9 0 0 1 .57.205l.067.06a.9.9 0 0 1 .06 1.206l-.06.066-5.585 5.586-.028.027.028.027 5.585 5.587a.9.9 0 0 1 .06 1.207l-.06.066a.9.9 0 0 1-1.207.06l-.066-.06-6.25-6.25a1 1 0 0 1-.158-.212l-.038-.08a.9.9 0 0 1-.03-.606l.03-.083a1 1 0 0 1 .137-.226l.06-.066 6.25-6.25a.9.9 0 0 1 .635-.263Z"
                    fill="#475569"
                    stroke="#475569"
                    strokeWidth=".078"
                  />
                </svg>
              </button>

              <div className="flex items-center gap-2 text-sm font-medium">
                <button className="h-10 w-10 flex items-center justify-center aspect-square">
                  1
                </button>
                <button className="h-10 w-10 flex items-center justify-center aspect-square">
                  2
                </button>
                <button className="h-10 w-10 flex items-center justify-center aspect-square text-indigo-500 border border-indigo-200 rounded-full">
                  3
                </button>
                <button className="h-10 w-10 flex items-center justify-center aspect-square">
                  4
                </button>
                <button className="h-10 w-10 flex items-center justify-center aspect-square">
                  5
                </button>
              </div>

              <button
                type="button"
                aria-label="next"
                className="rounded-full bg-slate-200/50"
              >
                <svg
                  className="rotate-180"
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.499 12.85a.9.9 0 0 1 .57.205l.067.06a.9.9 0 0 1 .06 1.206l-.06.066-5.585 5.586-.028.027.028.027 5.585 5.587a.9.9 0 0 1 .06 1.207l-.06.066a.9.9 0 0 1-1.207.06l-.066-.06-6.25-6.25a1 1 0 0 1-.158-.212l-.038-.08a.9.9 0 0 1-.03-.606l.03-.083a1 1 0 0 1 .137-.226l.06-.066 6.25-6.25a.9.9 0 0 1 .635-.263Z"
                    fill="#475569"
                    stroke="#475569"
                    strokeWidth=".078"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BooksPage;
