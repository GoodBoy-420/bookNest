import Ratings from "./Ratings";

const BookList = ({ book }) => {
  return (
    <div className="flex flex-col bg-white shadow-md w-72">
      <img
        className="w-72 h-48 object-cover"
        src="https://images.unsplash.com/photo-1657560566744-06d0b69f6647?q=80&w=600&auto=format&fit=crop"
        alt="image"
      />
      <div className="p-4 text-sm">
        <p className="text-slate-600"> {book.price} </p>
        <p className="text-slate-800 text-base font-medium my-1.5">
          {book.title}
        </p>
        <p className="text-slate-500">{book.description}</p>
        <div className="flex py-2 my-2">
          <Ratings rating={book.ratings} />
        </div>
        <div className="grid grid-cols-2 gap-2 mt-3">
          <button className="bg-slate-100 text-slate-600 py-2">
            Add to cart
          </button>
          <button className="bg-slate-800 text-white py-2">Buy now</button>
        </div>
      </div>
    </div>
  );
};

export default BookList;
