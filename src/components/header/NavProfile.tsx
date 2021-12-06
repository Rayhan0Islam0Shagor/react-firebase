import React from 'react';
import { Link } from 'react-router-dom';
import { GoSignOut } from 'react-icons/go';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { authLogout } from 'redux/slices/authSlice';

const NavProfile = () => {
  const [loading, setLoading] = React.useState(true);
  const { currentUser } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="flex items-center space-x-2">
        <Link to="/profile" replace className="flex items-center space-x-1">
          <div className="w-10 h-10 overflow-hidden rounded-full">
            {
              <div className="relative w-full h-full overflow-hidden rounded-full shadow">
                <img
                  alt="Avatar"
                  src={
                    currentUser.photoURL
                      ? currentUser.photoURL
                      : 'https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg'
                  }
                  width="256"
                  height="256"
                  className={`w-full object-cover  h-full  transition-opacity duration-200 ${
                    loading ? 'opacity-0' : 'opacity-100'
                  }`}
                  onLoad={() => {
                    setLoading(false);
                  }}
                />
                {loading && (
                  <div className="absolute top-0 w-full h-full bg-gray-100 animate-pulse dark:bg-gray-900" />
                )}
              </div>
            }
          </div>
          <span className="mr-4 font-semibold capitalize">
            {currentUser.displayName.split(' ')[0]}
          </span>
        </Link>
        <button
          className="p-2 text-white bg-red-500 rounded-md hover:bg-red-600"
          onClick={() => dispatch(authLogout())}
        >
          <GoSignOut />
        </button>
      </div>
    </>
  );
};

export default NavProfile;
