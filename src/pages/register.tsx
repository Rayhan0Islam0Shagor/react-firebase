import { useEffect } from 'react';
import RegisterForm from 'components/auth/RegisterForm';
import { BigLoading } from 'components/global/Loading';
import { useAppSelector } from 'redux/hooks';
import { Link, useHistory } from 'react-router-dom';

const Register = () => {
  const { loading, currentUser } = useAppSelector((state) => state.auth);

  const history = useHistory();

  useEffect(() => {
    if (currentUser) return history.replace('/');
  }, [currentUser, history]);

  return (
    <section className="flex pt-4 justify-center items-center min-h-[calc(100vh-6rem)]">
      <div className="container max-w-md p-5 shadow">
        <h2 className="my-3 text-2xl font-semibold tracking-widest text-center uppercase">
          Registration
        </h2>

        <RegisterForm />

        <div className="text-center">
          You already have an account?{' '}
          <Link to="/login" className="text-gray-900 hover:underline">
            Login
          </Link>
        </div>
      </div>

      {loading && <BigLoading />}
    </section>
  );
};

export default Register;
