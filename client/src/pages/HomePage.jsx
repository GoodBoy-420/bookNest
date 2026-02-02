const HomePage = () => {
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="23"
              viewBox="0 0 30 30"
              fill="#6B7280"
            >
              <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8" />
            </svg>
            <input
              type="text"
              placeholder="Search for books"
              className="w-full h-full outline-none text-gray-500 placeholder-gray-500 text-sm"
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-500 w-32 h-11.5 rounded-md text-sm text-white"
          >
            Search
          </button>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-2xl font-semibold mb-8 text-center">
            Featured Books
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4">
              <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
              <h4 className="font-medium text-lg">Book Title</h4>
              <p className="text-sm text-gray-500">Author Name</p>
              <p className="mt-2 font-semibold text-primary">$19.99</p>
            </div>

            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4"
              >
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <h4 className="font-medium text-lg">Book Title</h4>
                <p className="text-sm text-gray-500">Author Name</p>
                <p className="mt-2 font-semibold text-primary">$19.99</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
