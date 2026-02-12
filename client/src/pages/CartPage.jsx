import { Link } from "react-router-dom";

import { useCart } from "../hooks/useCart.js";

const CartPage = () => {
  const { state } = useCart();

  return (
    <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-medium mb-6">
          Cart List <span className="text-sm text-indigo-500">3 Items</span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
          <p className="text-left">Product Details</p>
          <p className="text-center">Price</p>
          <p className="text-center">Quantity</p>
          <p className="text-center">Action</p>
        </div>

        {state?.items?.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[2fr_1fr_1fr_1fr] items-center text-gray-500 text-sm md:text-base font-medium pt-4"
          >
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
          </div>
        ))}

        <Link
          to="/books"
          className="group cursor-pointer flex items-center mt-8 gap-2 text-indigo-500 font-medium"
        >
          <svg
            width="15"
            height="11"
            viewBox="0 0 15 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.09 5.5H1M6.143 10 1 5.5 6.143 1"
              stroke="#615fff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Continue Shopping
        </Link>
      </div>

      <div className="max-w-90 w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
        <h2 className="text-xl font-medium">Order Summary</h2>
        <hr className="border-gray-300 my-5" />

        <div className="text-gray-500 space-y-3">
          <p className="flex justify-between">
            <span>Total Items</span>
            <span> {state.totalItems} </span>
          </p>
          <p className="flex justify-between">
            <span>Estimated Price</span>
            <span> {state.totalPrice} </span>
          </p>
        </div>

        <button className="w-full py-3 mt-6 bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
