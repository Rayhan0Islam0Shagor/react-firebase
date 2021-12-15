import React, { useEffect, useState } from 'react';
import { changeDisplayName } from 'actions/accountActions';
import { toast } from 'react-toastify';
import { useAppSelector } from 'redux/hooks';

const DisplayName = () => {
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);

  const { currentUser } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (currentUser?.displayName) {
      setDisplayName(currentUser?.displayName);
    }
  }, [currentUser?.displayName]);

  const handleSubmit = async () => {
    if (!currentUser || !displayName.trim()) return;

    if (displayName.toLowerCase() === currentUser?.displayName?.toLowerCase())
      return toast.info(`"${displayName}" is already your display name.`);

    setLoading(true);
    await changeDisplayName(currentUser, displayName);
    setLoading(false);
    setDisplayName('');
  };

  return (
    <div>
      <div>
        <label
          htmlFor="displayName"
          className="block text-sm font-medium text-gray-700"
        >
          Display Name
        </label>
        <input
          type="text"
          name="name"
          id="displayName"
          autoComplete="name"
          className="block w-full p-2 mt-1 bg-gray-100 border-gray-300 rounded-sm shadow-sm outline-none sm:text-sm"
          required
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </div>
      <div className="text-right">
        <button
          className="px-6 py-1 my-2 text-sm font-semibold text-right border rounded-md hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 "
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? 'Changing...' : 'Change'}
        </button>
      </div>
    </div>
  );
};

export default DisplayName;
