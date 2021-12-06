import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-8rem)] font-semibold  text-center justify-center items-center">
      <img className="object-cover w-28 h-28" src="/images/logo.gif" alt="" />
      <h1 className="my-2 text-2xl font-bold text-gray-900 uppercase">
        Page not Found!!
      </h1>

      <Link to="/">
        <button className="px-5 py-3 mt-3 text-white bg-gray-900 border-none rounded-lg focus:outline-none hover:bg-black">
          Go Home
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
