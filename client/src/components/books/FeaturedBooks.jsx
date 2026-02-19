import ButtonsBooks from "./ButtonsBooks";
import Ratings from "./Ratings";

const LatestBooks = ({ latestBooks }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {latestBooks?.map((book) => {
        return (
          <div
            key={book._id}
            className="flex flex-col bg-white w-72 shadow-sm hover:shadow-md"
          >
            <img
              className="w-72 h-48 object-cover"
              src="https://images.unsplash.com/photo-1657560566744-06d0b69f6647?q=80&w=600&auto=format&fit=crop"
              alt="image"
            />
            <div className="p-4 text-sm">
              <p className="text-slate-600"> $ {book.price} </p>
              <p className="text-slate-800 text-base font-medium my-1.5">
                {book.title.slice(0, 28)}
              </p>
              <p className="text-slate-500">{book.description.slice(0, 30)}</p>
              <div className="flex py-2 my-2">
                <Ratings rating={book.ratings} />
              </div>
              <ButtonsBooks book={book} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LatestBooks;
