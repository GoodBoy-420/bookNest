const CartList = ({ item }) => {
  return (
    <>
      {" "}
      <div className="flex items-center gap-4">
        <div className="w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden">
          <img
            src="https://placehold.co/600x400"
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="font-semibold">{item.title ?? item.book.title}</p>
        </div>
      </div>
      <div className="text-center">
        <p className="font-semibold text-gray-800">
          ${item.price ?? item.book.price}
        </p>
      </div>
      <div className="flex items-center justify-center gap-3">
        <button className="w-8 h-8 border border-gray-300">-</button>
        <span>{item.quantity}</span>
        <button className="w-8 h-8 border border-gray-300">+</button>
      </div>
      <button className="mx-auto">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m12.5 7.5-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0"
            stroke="#FF532E"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </>
  );
};

export default CartList;
