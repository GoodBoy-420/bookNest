const LatestBooks = ({ featuredBooks }) => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h3 className="text-2xl font-semibold mb-8 text-center">
          Featured Books
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredBooks?.map((book) => {
            return (
              <div
                key={book._id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4"
              >
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <h4 className="font-medium text-lg">
                  {book.title.slice(0, 28)} ...
                </h4>
                <p className="text-sm text-gray-500"> {book.author} </p>
                <p className="mt-2 font-semibold text-primary">
                  Price- {book.price}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LatestBooks;
