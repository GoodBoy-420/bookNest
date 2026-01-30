const BooksPage = () => {
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
          <div className="bg-white border rounded-xl p-4 hover:shadow-lg transition">
            <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>

            <h3 className="text-lg font-semibold">Book Title</h3>
            <p className="text-sm text-gray-500">by Author Name</p>

            <p className="text-sm mt-2 line-clamp-3 text-gray-600">
              This is a short description of the book. It gives readers an idea
              about the content.
            </p>

            <p className="mt-3 font-semibold text-primary">$18.99</p>

            <div className="flex gap-3 mt-4">
              <button className="flex-1 bg-primary text-white py-2 rounded-lg hover:opacity-90 transition">
                Add to Cart
              </button>
              <button className="flex-1 border border-primary text-primary py-2 rounded-lg hover:bg-primary hover:text-white transition">
                Wishlist
              </button>
            </div>
          </div>

          {[...Array(7)].map((_, index) => (
            <div
              key={index}
              className="bg-white border rounded-xl p-4 hover:shadow-lg transition"
            >
              <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
              <h3 className="text-lg font-semibold">Book Title</h3>
              <p className="text-sm text-gray-500">by Author Name</p>
              <p className="text-sm mt-2 line-clamp-3 text-gray-600">
                This is a short description of the book. It gives readers an
                idea about the content.
              </p>
              <p className="mt-3 font-semibold text-primary">$18.99</p>
              <div className="flex gap-3 mt-4">
                <button className="flex-1 bg-primary text-white py-2 rounded-lg">
                  Add to Cart
                </button>
                <button className="flex-1 border border-primary text-primary py-2 rounded-lg">
                  Wishlist
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-center items-center gap-2 mt-12">
            <button className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100">
              Prev
            </button>

            <button className="px-4 py-2 rounded-lg bg-primary text-white font-medium">
              1
            </button>

            <button className="px-4 py-2 border rounded-lg hover:bg-gray-100">
              2
            </button>

            <button className="px-4 py-2 border rounded-lg hover:bg-gray-100">
              3
            </button>

            <span className="px-2 text-gray-400">...</span>

            <button className="px-4 py-2 border rounded-lg hover:bg-gray-100">
              10
            </button>

            <button className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100">
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BooksPage;
