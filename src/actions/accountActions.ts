import {
  EmailAuthProvider,
  FacebookAuthProvider,
  GoogleAuthProvider,
  reauthenticateWithCredential,
  reauthenticateWithPopup,
  updateCurrentUser,
  updateEmail,
  updatePassword,
  updateProfile,
} from 'firebase/auth';
import { toast } from 'react-toastify';
import { IAuth } from 'types';
import { auth } from 'firebase';

export const changeAvatar = async (user: IAuth, url: string) => {
  try {
    await updateProfile(user, {
      photoURL: url,
    });
    await updateCurrentUser(auth, user);
  } catch (error: any) {
    return toast.error(error.message);
  }
};

export const changeDisplayName = async (user: IAuth, name: string) => {
  try {
    await updateProfile(user, {
      displayName: name,
    });
    await updateCurrentUser(auth, user);
  } catch (error: any) {
    return toast.error(error.message);
  }
};

export const changeEmail = async (
  user: IAuth,
  new_email: string,
  pass: string
) => {
  try {
    const res = await reAuth(user, pass);

    if (res) return toast.error(res);

    await updateEmail(user, new_email);
    // await updateCurrentUser(auth, user);
    return toast.success('Updated New Email.');
  } catch (error: any) {
    return toast.error(error.message);
  }
};

export const reAuth = async (user: IAuth, pass: string) => {
  try {
    const providerId = user.providerData[0].providerId;

    // password
    if (providerId === 'password') {
      if (!user.email) return;

      const credential = EmailAuthProvider.credential(user.email, pass);

      await reauthenticateWithCredential(user, credential);
    }

    // Google
    if (providerId === 'google.com') {
      await reauthenticateWithPopup(user, new GoogleAuthProvider());
    }

    // facebook
    if (providerId === 'facebook.com') {
      await reauthenticateWithPopup(user, new FacebookAuthProvider());
    }
  } catch (error: any) {
    return toast.error(error.message);
  }
};

export const changePassword = async (
  user: IAuth,
  old_pass: string,
  new_pass: string
) => {
  try {
    const res = await reAuth(user, old_pass);

    if (res) return toast.error(res);

    await updatePassword(user, new_pass);
    return toast.success('Updated New Password.');
  } catch (error: any) {
    return toast.error(error.message);
  }
};
