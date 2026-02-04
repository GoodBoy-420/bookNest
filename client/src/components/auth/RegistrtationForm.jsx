import { Link } from "react-router-dom";

import Email from "../../assets/email.svg";
import Lock from "../../assets/lock.svg";

const RegistrtationForm = () => {
  return (
    <form className="md:w-96 w-80 flex flex-col items-center justify-center">
      <h2 className="text-4xl text-gray-900 font-medium">Sign in</h2>
      <p className="text-sm text-gray-500/90 mt-3">
        Welcome back! Please sign in to continue
      </p>

      <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2 mt-4">
        <img src={Email} alt="email" />
        <input
          type="email"
          placeholder="Email id"
          className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
          required
        />
      </div>

      <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
        <img src={Lock} alt="lock" />
        <input
          type="password"
          placeholder="Password"
          className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
          required
        />
      </div>

      <button
        type="submit"
        className="mt-8 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity"
      >
        Sign Up
      </button>

      <p className="text-gray-500/90 text-sm mt-4">
        Already Have an account?
        <Link className="text-indigo-400 hover:underline" to="/signin">
          Sign in
        </Link>
      </p>
    </form>
  );
};

export default RegistrtationForm;
