import { toast } from 'react-toastify';
import {
  getDownloadURL,
  listAll,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { storage } from 'firebase';

export const uploadFiles = async (folder: string, files: File[]) => {
  const promises: any[] = [];

  files.forEach((file) => {
    const storageRef = ref(storage, `${folder}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    promises.push(uploadTask);
  });

  const result: any[] = [];

  await Promise.allSettled(promises).then((res) => {
    res.forEach((item) => {
      if (item.status === 'fulfilled') {
        result.push(item.value);
      }
    });
  });

  // const result = await Promise.all(promises);
  const urlPromises = result.map((item) => {
    const path = item.ref.toString();
    return getDownloadURL(ref(storage, path));
  });

  const urls: string[] = [];

  await Promise.allSettled(urlPromises).then((res) => {
    res.forEach((item) => {
      if (item.status === 'fulfilled') {
        urls.push(item.value);
      }
    });
  });

  return urls;
  // return await Promise.all(urlPromises);
};

export const getFiles = async (
  folder: string,
  callback: (urls: string[]) => void
) => {
  let listRef = ref(storage, `${folder}`);

  listAll(listRef)
    .then(async (res) => {
      const urlPromises = res.items.map((itemRef) => {
        const path = itemRef.toString();
        return getDownloadURL(ref(storage, path));
      });

      return await Promise.allSettled(urlPromises).then((res) => {
        const urls: string[] = [];

        res.forEach((item) => {
          if (item.status === 'fulfilled') {
            urls.push(item.value);
          }
        });

        callback(urls);
      });

      // return Promise.all(urlPromises).then((urls) => callback(urls));
    })
    .catch((err) => toast.error(err.message));
};

// const downloadFile = async (path: string) => {
//   let item = '';

//   await getDownloadURL(ref(storage, path))
//     .then((url) => (item = url))
//     .catch((err) => {
//       return toast.error(err.message);
//     });

//   return item;
// };
