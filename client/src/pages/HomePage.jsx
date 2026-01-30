const HomePage = () => {
  return (
    <>
      <section className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl md:text-5xl font-semibold mb-4">
          Discover Your Next Favorite Book
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-8">
          Explore thousands of books from various genres. Curated just for book
          lovers.
        </p>
        <button className="bg-primary text-white px-8 py-3 rounded-lg text-lg hover:opacity-90 transition">
          Browse Books
        </button>
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
