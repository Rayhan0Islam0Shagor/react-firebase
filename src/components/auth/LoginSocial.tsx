import { FcGoogle } from 'react-icons/fc';
import { BsFacebook } from 'react-icons/bs';
import { useAppDispatch } from 'redux/hooks';
import { authGoggleLogin, authFacebookLogin } from 'redux/slices/authSlice';

const LoginSocial = () => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <button
        className="flex items-center justify-center w-full p-3 my-2 space-x-2 font-semibold bg-gray-100 border hover:bg-gray-200 focus:outline-none"
        onClick={() => dispatch(authGoggleLogin())}
      >
        <FcGoogle /> <span>Google</span>
      </button>
      <button
        className="flex items-center justify-center w-full p-3 my-2 space-x-2 font-semibold text-white bg-blue-500 focus:outline-none hover:bg-blue-600"
        onClick={() => dispatch(authFacebookLogin())}
      >
        <BsFacebook /> <span>Facebook</span>
      </button>
    </div>
  );
};

export default LoginSocial;
