import { Link } from "react-router-dom";

const products = [
  {
    name: "Running Shoes",
    description: [
      "Lightweight and comfortable",
      "Breathable mesh upper",
      "Ideal for jogging and casual wear",
    ],
    offerPrice: 250,
    price: 200,
    quantity: 1,
    size: 42,
    image:
      "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage.png",
    category: "Footwear",
  },
  {
    name: "Running Shoes",
    description: [
      "Lightweight and comfortable",
      "Breathable mesh upper",
      "Ideal for jogging and casual wear",
    ],
    offerPrice: 250,
    price: 200,
    quantity: 1,
    size: 42,
    image:
      "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage2.png",
    category: "Footwear",
  },
  {
    name: "Running Shoes",
    description: [
      "Lightweight and comfortable",
      "Breathable mesh upper",
      "Ideal for jogging and casual wear",
    ],
    offerPrice: 250,
    price: 200,
    quantity: 1,
    size: 42,
    image:
      "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage3.png",
    category: "Footwear",
  },
];
const WishListPage = () => {
  return (
    <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-medium mb-6">
          Wishlist <span className="text-sm text-indigo-500">3 Items</span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
          <p className="text-left">Product Details</p>
          <p className="text-center">Quantity</p>
          <p className="text-center">Action</p>
        </div>

        {products.map((product, index) => (
          <div
            key={index}
            className="grid grid-cols-[2fr_1fr_1fr] items-center text-gray-500 text-sm md:text-base font-medium pt-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-semibold">{product.name}</p>
                <p className="text-sm text-gray-400">
                  Size: {product.size || "N/A"}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button className="w-8 h-8 border border-gray-300">-</button>
              <span>{product.quantity}</span>
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

        <div className="flex gap-4 mt-10">
          <Link
            to="/checkout"
            className="flex-1 text-center py-3 bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition"
          >
            Checkout
          </Link>
          <Link
            to="/products"
            className="flex-1 text-center py-3 border border-indigo-500 text-indigo-500 font-medium hover:bg-indigo-500 hover:text-white transition"
          >
            View Products
          </Link>
        </div>
      </div>

      <div className="max-w-90 w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
        <h2 className="text-xl font-medium">Wishlist Summary</h2>
        <hr className="border-gray-300 my-5" />

        <div className="text-gray-500 space-y-3">
          <p className="flex justify-between">
            <span>Total Items</span>
            <span>3</span>
          </p>
          <p className="flex justify-between">
            <span>Estimated Price</span>
            <span>$120</span>
          </p>
        </div>

        <button className="w-full py-3 mt-6 bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition">
          Move All To Cart
        </button>
      </div>
    </div>
  );
};

export default WishListPage;
