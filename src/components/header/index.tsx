import { Link } from 'react-router-dom';
import { useAppSelector } from 'redux/hooks';
import Nav from './Nav';
import NavProfile from './NavProfile';

const Header = () => {
  const { currentUser } = useAppSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-10 py-4 bg-white shadow-lg min-h-16">
      <div className="flex flex-wrap items-center justify-between max-w-6xl px-4 mx-auto">
        <h1 className="text-2xl font-semibold">
          <Link to="/">
            <img
              className="object-cover w-10 h-10"
              src="/images/logo.gif"
              alt="logo"
            />
          </Link>
        </h1>
        {currentUser ? <NavProfile /> : <Nav />}
      </div>
    </header>
  );
};

export default Header;
