import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="w-full border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">BookNest</h1>

        <ul className="hidden md:flex gap-8 font-medium">
          <li className="cursor-pointer hover:text-primary">
            <Link to="/">Home</Link>
          </li>
          <li className="cursor-pointer hover:text-primary">
            <Link to="/books">Books</Link>
          </li>
          <li className="cursor-pointer hover:text-primary">
            <Link to="/about">About</Link>
          </li>
          <li className="cursor-pointer hover:text-primary">Contact</li>
        </ul>

        <button className="hidden md:block bg-primary text-white px-5 py-2 rounded-lg hover:opacity-90 transition">
          Sign In
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
