import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div className="flex space-x-2 text-sm font-semibold">
      <Link
        to="/login"
        className="px-5 py-2 border hover:bg-blue-500  hover:text-gray-100 transform transition-all duration-200 ease-in-out rounded-lg"
      >
        <button className="font-semibold">Login</button>
      </Link>
      <Link
        to="/register"
        className="px-5 py-2 border bg-gray-500 text-white hover:bg-black  hover:text-gray-100 transform transition-all duration-200 ease-in-out rounded-lg"
      >
        <button className="font-semibold">Register</button>
      </Link>
    </div>
  );
};

export default Nav;
