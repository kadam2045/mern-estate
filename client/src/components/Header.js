import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-slate-200  shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
          <Link to="/">
            <span className="text-slate-500">Real</span>
            <span className="text-slate-800">Estate</span>
          </Link>
        </h1>
        <form className="bg-slate-100 p-3  rounded-xl flex items-center ">
          <input
            type="text"
            placeholder="Search...."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-600 " />
        </form>
        <ul className="flex gap-4 ">
          <Link to="/home">
            <li className="hidden sm:inline hover:underline text-slate-800">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline hover:underline  text-slate-800">
              About
            </li>
          </Link>
          <Link to="/sign-in">
            <li className=" hover:underline  text-slate-800">Sign In </li>
          </Link>
        </ul>
      </div>
    </header>
  );
}
