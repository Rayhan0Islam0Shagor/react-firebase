import Header from 'components/header';
import { useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import PageRender from './PageRender';
import {
  onIdTokenChanged,
  sendEmailVerification,
  signOut,
} from 'firebase/auth';
import { auth } from 'firebase';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { addUser } from 'redux/slices/authSlice';
import { fetchProfile } from 'redux/slices/profileSlice';

function App() {
  const { currentUser } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const history = useHistory();

  useEffect(
    () =>
      onIdTokenChanged(auth, async (user) => {
        if (user) {
          const providerId = user.providerData.some(
            (p) => p.providerId === 'password'
          );

          if (providerId && !user.emailVerified) {
            await sendEmailVerification(user);
            await signOut(auth);
            return history.push('/email_verified');
          }

          dispatch(addUser(user));
        } else {
          dispatch(addUser(undefined));
          return history.push('/login');
        }
      }),
    [dispatch, history]
  );

  useEffect(() => {
    if (currentUser?.uid) dispatch(fetchProfile(currentUser.uid));
  }, [currentUser, dispatch]);

  return (
    <>
      <Header />
      <main className="container p-4 mx-auto max-w-7xl">
        <Switch>
          <Route path="/" component={PageRender} exact />
          <Route path="/:page" component={PageRender} exact />
          <Route path="/:page/:id" component={PageRender} exact />
        </Switch>
      </main>
    </>
  );
}

export default App;
