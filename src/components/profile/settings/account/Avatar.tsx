import InputFiles from 'components/global/InputFiles';
import React, { useState } from 'react';
import { useAppSelector } from 'redux/hooks';
import { uploadFiles } from 'redux/actions/uploadActions';
import { changeAvatar } from 'redux/actions/accountActions';

const Avatar = () => {
  const [files, setFiles] = useState<(File | string)[]>([]);
  const [loading, setLoading] = useState(false);

  const { currentUser } = useAppSelector((state) => state.auth);
  const handleChangeAvatar = async () => {
    let image = files[0];

    if (!files.length || !currentUser) return;
    setLoading(true);

    if (typeof image === 'string') {
      await changeAvatar(currentUser, image);
      setLoading(false);
    } else {
      const res = await uploadFiles(
        `images/${currentUser.uid}`,
        files as File[]
      );
      await changeAvatar(currentUser, res[0]);
      setLoading(false);
    }

    setFiles([]);
  };

  return (
    <div>
      <div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Avatar
          </label>
          <div className="flex items-center mt-1">
            <span className="inline-block w-12 h-12 overflow-hidden bg-gray-100 rounded-full">
              {currentUser?.photoURL ? (
                <img
                  src={currentUser?.photoURL}
                  alt={currentUser?.displayName || 'avatar'}
                  className="object-cover w-full h-full"
                />
              ) : (
                <svg
                  className="w-full h-full text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </span>
            <button
              disabled={loading || !files.length}
              type="button"
              className="px-3 py-2 ml-5 text-sm font-medium leading-4 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50 disabled:text-gray-700 disabled:hover:border-gray-200 disabled:hover:border-gray-200 animate-pulse disabled:animate-none"
              onClick={handleChangeAvatar}
            >
              {loading ? 'loading' : 'Change'}
            </button>
          </div>
        </div>
      </div>

      <InputFiles multiple={true} files={files} setFiles={setFiles} />

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default Avatar;
