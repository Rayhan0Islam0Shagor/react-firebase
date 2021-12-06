import Errors from 'components/global/Errors';
import { FormEvent, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
// import { registerApi } from 'redux/actions/authActions';
import { validationRegister } from 'utils/validation';
import { useDispatch } from 'react-redux';
import { authRegister } from 'redux/slices/authSlice';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const handleClick = () => {
    setShow(!show);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const user = { name, email, password, confirmPassword };
    const result = validationRegister(user);
    if (result.errLength)
      return toast.error(() => <Errors errors={result.errMsg} />);

    dispatch(authRegister(user));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="my-3">
        <label className="text-sm font-semibold uppercase" htmlFor="name">
          Display name
        </label>
        <input
          type="text"
          id="name"
          className="w-full p-3 border focus:outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
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
      <div className="my-3">
        <label
          className="text-sm font-semibold uppercase"
          htmlFor="cf_password"
        >
          Confirm Password
        </label>
        <input
          type={show ? 'text' : 'password'}
          id="cf_password"
          className="w-full p-3 border focus:outline-none"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="w-full p-3 my-2 font-semibold tracking-widest text-center uppercase border-2 hover:bg-black hover:text-white"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
