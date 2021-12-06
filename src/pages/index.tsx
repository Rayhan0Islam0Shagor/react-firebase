import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppSelector } from 'redux/hooks';

const Home = () => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const history = useHistory();

  useEffect(() => {
    if (!currentUser) return history.push('/login');
  }, [currentUser, history]);

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
