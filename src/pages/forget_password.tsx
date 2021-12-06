import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { authForgetPassword } from 'redux/slices/authSlice';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const history = useHistory();
  const dispatch = useAppDispatch();

  const { loading } = useAppSelector((state) => state.auth);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    dispatch(authForgetPassword(email));

    setInterval(() => {
      history.goBack();
    }, 6000);
  };

  return (
    <section className="min-h-[calc(100vh-8rem)] font-semibold">
      <div className="max-w-lg mx-auto my-16 text-gray-600">
        <h2 className="text-3xl font-semibold uppercase">Forgot Password?</h2>

        <form className="my-3" onSubmit={handleSubmit}>
          <label htmlFor="email" className="text-md">
            Email address
          </label>

          <div className="flex w-full">
            <input
              type="email"
              name="email"
              id="email"
              className="w-full p-2 border focus:outline-none"
              value={email}
              placeholder="email@example.com"
              required
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              type="submit"
              className="px-4 ml-1 border hover:bg-black hover:text-white"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Send'}
            </button>
          </div>
        </form>

        <button
          className="flex items-center px-4 py-2 space-x-2 text-white bg-gray-900 rounded-md hover:bg-black hover:text-white"
          onClick={() => history.goBack()}
        >
          <BsFillArrowLeftCircleFill className="w-5 h-5 mr-1" />{' '}
          <span>Back</span>
        </button>
      </div>
    </section>
  );
};

export default ForgetPassword;
