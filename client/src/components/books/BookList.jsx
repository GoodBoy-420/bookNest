import ButtonsBooks from "./ButtonsBooks";
import Ratings from "./Ratings";

const BookList = ({ book }) => {
  return (
    <div className="flex felx-wrap gap-6">
      <div className="flex flex-col bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden w-72">
        <img
          className="w-full h-48 object-cover"
          src="https://images.unsplash.com/photo-1657560566744-06d0b69f6647?q=80&w=600&auto=format&fit=crop"
          alt="image"
        />

        <div className="flex flex-col p-4 gap-2 text-sm flex-1 justify-between">
          <div>
            <p className="text-slate-600 font-medium">$ {book.price}</p>
            <p className="text-slate-800 text-base font-semibold">
              {book.title.slice(0, 28)}
            </p>
            <p className="text-slate-500">{book.description.slice(0, 30)}</p>
          </div>

          <div className="flex flex-col">
            <div className="flex py-2">
              <Ratings rating={book.ratings} />
            </div>
            <ButtonsBooks book={book} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookList;
