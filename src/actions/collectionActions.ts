import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  orderBy,
  OrderByDirection,
} from 'firebase/firestore/lite';
import { toast } from 'react-toastify';
import { db } from 'firebase';
import { ICollection } from 'types';

export const createCollection = async (
  uid: string,
  title: string,
  photos: string[]
) => {
  try {
    const data = {
      uid,
      title,
      photos,
      createdAt: new Date().toISOString(),
    };

    const res = await addDoc(collection(db, 'collections'), data);

    return { ...data, id: res.id };
  } catch (error: any) {
    return toast.error(error.message);
  }
};

export const updateCollection = async (data: any) => {
  try {
    await updateDoc(doc(db, `collections/${data.id}`), data);
    return toast.success('Update successfully!');
  } catch (error: any) {
    return toast.error(error.message);
  }
};

export const removeCollection = async (data: any) => {
  try {
    await deleteDoc(doc(db, `collections/${data.id}`));
    return toast.success('Delete successfully!');
  } catch (error: any) {
    return toast.error(error.message);
  }
};

export const getCollections = async (uid: string, sort: string) => {
  try {
    const data: ICollection[] = [];

    const q = query(
      collection(db, 'collections'),
      where('uid', '==', uid),
      orderBy('createdAt', sort as OrderByDirection)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id });
    });

    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];

    return data;
  } catch (error: any) {
    return toast.error(error.message);
  }
};

export const getCollection = async (id: string) => {
  try {
    const docRef = doc(db, `collections/${id}`);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) return docSnap.data();
  } catch (error: any) {
    return toast.error(error.message);
  }
};
