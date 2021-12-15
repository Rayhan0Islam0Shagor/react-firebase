import { changeEmail } from 'actions/accountActions';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAppSelector } from 'redux/hooks';

const Email = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { currentUser } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (currentUser?.email) {
      setEmail(currentUser?.email);
    }
  }, [currentUser?.email]);

  const handleSubmit = async () => {
    if (!currentUser || !email.trim()) return;

    if (email.toLowerCase() === currentUser?.email?.toLowerCase())
      return toast.info(`"${email}" is already your email.`);

    const provider = currentUser.providerData.some(
      (p) => p.providerId === 'password'
    );

    if (provider && !password) return setShowPassword(true);

    setLoading(true);
    await changeEmail(currentUser, email, password);
    setLoading(false);
    setEmail('');
    setPassword('');
    setShowPassword(false);
  };

  return (
    <div>
      <h1 className="block mb-2 text-md font-semibold text-gray-700">
        Change Email
      </h1>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          autoComplete="email"
          className="block w-full p-2 mt-1 bg-gray-100 border-gray-300 rounded-sm shadow-sm outline-none sm:text-sm"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      {/*Current Password */}

      {showPassword && (
        <div>
          <label
            htmlFor="password"
            className="block mt-1 text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="password"
            className="block w-full p-2 mt-1 bg-gray-100 border-gray-300 rounded-sm shadow-sm outline-none sm:text-sm"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      )}

      {/* button */}
      <div className="text-right">
        <button
          onClick={handleSubmit}
          className="px-6 py-1 my-2 text-sm font-semibold text-right border rounded-md hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'Changing...' : 'Change'}
        </button>
      </div>
    </div>
  );
};

export default Email;
