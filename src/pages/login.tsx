import { useEffect } from 'react';
import { BigLoading } from 'components/global/Loading';
import { useAppSelector } from 'redux/hooks';
import { Link, useHistory } from 'react-router-dom';
import LoginForm from 'components/auth/LoginForm';
import LoginSocial from 'components/auth/LoginSocial';

const Login = () => {
  const { loading, currentUser } = useAppSelector((state) => state.auth);

  const history = useHistory();

  useEffect(() => {
    if (currentUser) return history.push('/');
  }, [currentUser, history]);

  return (
    <section className="flex pt-4 justify-center items-center min-h-[calc(100vh-6rem)]">
      <div className="container max-w-md p-5 shadow">
        <h2 className="my-3 text-2xl font-semibold tracking-widest text-center uppercase">
          Login
        </h2>

        <LoginForm />

        <div className="flex items-center justify-center">Or</div>

        <LoginSocial />

        <div className="text-center">
          Not have an account?{' '}
          <Link
            to="/register"
            className="font-semibold text-red-600 hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>

      {loading && <BigLoading />}
    </section>
  );
};

export default Login;
