import { Link } from "react-router-dom";

import { useCart } from "../../hooks/useCart";

const ButtonsBooks = ({ book }) => {
  const { addToCart } = useCart();
  return (
    <div className="grid grid-cols-2 gap-2 mt-3">
      <Link
        to={`/book/${book._id}`}
        className="bg-slate-100 hover:bg-cyan-600 text-white-600 py-2 text-center"
      >
        Details
      </Link>
      <button
        onClick={() => addToCart(book._id, book.price, book.title)}
        className="bg-slate-100 hover:bg-cyan-600 text-white-600 py-2 cursor-pointer"
      >
        Add to cart
      </button>
    </div>
  );
};

export default ButtonsBooks;
