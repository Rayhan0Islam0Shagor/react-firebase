import { FormEvent, useState } from 'react';
import Errors from 'components/global/Errors';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { validationLogin } from 'utils/validation';
import { useDispatch } from 'react-redux';
import { authLogin } from 'redux/slices/authSlice';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const handleClick = () => {
    setShow(!show);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const user = { email, password, remember };
    const result = validationLogin(user);
    if (result.errLength)
      return toast.error(() => <Errors errors={result.errMsg} />);

    dispatch(authLogin(user));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="my-3">
        <label className="text-sm font-semibold uppercase" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="w-full p-3 border focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="my-3">
        <label className="text-sm font-semibold uppercase" htmlFor="password">
          Password
        </label>
        <div className="relative">
          <input
            type={show ? 'text' : 'password'}
            id="password"
            className="w-full p-3 border focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {show ? (
            <FaEyeSlash
              onClick={handleClick}
              className={`absolute p-1 text-lg text-black bg-gray-100 rounded-full cursor-pointer w-7 h-7 top-3 right-2 ${
                password.length > 1 && 'animate-pulse'
              }`}
            />
          ) : (
            <FaEye
              onClick={handleClick}
              className={`absolute p-1 text-lg text-black bg-gray-100 rounded-full cursor-pointer w-7 h-7 top-3 right-2 ${
                password.length > 1 && 'animate-pulse'
              }`}
            />
          )}
        </div>
      </div>

      <div className="flex items-center justify-between my-2">
        <div className="flex items-center space-x-1">
          <input
            type="checkbox"
            id="rb-me"
            className="w-4 h-4 cursor-pointer"
            checked={remember}
            onChange={() => setRemember(!remember)}
          />
          <label
            htmlFor="rb-me"
            className="block text-sm text-gray-900 cursor-pointer"
          >
            Remember me
          </label>
        </div>

        <Link
          className="block ml-2 text-sm text-blue-500 cursor-pointer hover:text-blue-600"
          to="/forget_password"
        >
          Forgot password
        </Link>
      </div>

      <button
        type="submit"
        className="w-full p-3 my-2 font-semibold tracking-widest text-center uppercase border-2 hover:bg-black hover:text-white"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
