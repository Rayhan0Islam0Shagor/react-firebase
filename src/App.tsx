import Header from 'components/header';
import { useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import PageRender from './PageRender';
import {
  onAuthStateChanged,
  sendEmailVerification,
  signOut,
} from 'firebase/auth';
import { auth } from 'firebase';
import { useAppDispatch } from 'redux/hooks';
import { addUser } from 'redux/slices/authSlice';

function App() {
  const dispatch = useAppDispatch();
  const history = useHistory();

  useEffect(
    () =>
      onAuthStateChanged(auth, async (user) => {
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
