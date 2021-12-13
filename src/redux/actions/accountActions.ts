import { updateCurrentUser, updateProfile } from 'firebase/auth';
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
