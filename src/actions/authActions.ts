import { auth, googleProvider, facebookProvider } from 'firebase';
import { IRegister, ILogin } from 'types';
import { toast } from 'react-toastify';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence,
  signInWithPopup,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth';

export const registerApi = async (user: IRegister) => {
  try {
    const res = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );

    await updateProfile(res.user, {
      displayName: user.name,
    });

    return res.user;
  } catch (error: any) {
    return toast.error(error.message);
  }
};

export const loginApi = async (user: ILogin) => {
  try {
    const { email, password, remember } = user;

    await setPersistence(
      auth,
      remember ? browserLocalPersistence : browserSessionPersistence
    );

    const res = await signInWithEmailAndPassword(auth, email, password);

    return res.user;
  } catch (error: any) {
    return toast.error(error.message);
  }
};

export const goggleApi = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    return res.user;
  } catch (error: any) {
    return toast.error(error.message);
  }
};

export const facebookApi = async () => {
  try {
    const res = await signInWithPopup(auth, facebookProvider);
    return res.user;
  } catch (error: any) {
    return toast.error(error.message);
  }
};

export const forgetPasswordApi = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return toast.success('success! check your email');
  } catch (error: any) {
    return toast.error(error.message);
  }
};

export const signOutApi = async () => {
  try {
    await signOut(auth);
  } catch (error: any) {
    return toast.error(error.message);
  }
};
