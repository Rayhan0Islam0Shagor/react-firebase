import React, { FormEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { profileUpdate } from 'redux/slices/profileSlice';
import { ChangeInput } from 'types';

interface IProps {
  setOnSetting: (onSetting: boolean) => void;
}

const ProfileForm: React.FC<IProps> = ({ setOnSetting }) => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const { profile } = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();
  const init = {
    name: currentUser?.displayName || '',
    email: currentUser?.email || '',
    address: '',
    website: '',
    phone: '',
    about: '',
  };

  const [data, setData] = useState(init);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (profile) {
      setData(profile);
    }
  }, [profile]);

  const handleInput = (e: ChangeInput) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    setLoading(true);
    await dispatch(profileUpdate({ user: currentUser, data }));
    setLoading(false);
    setOnSetting(false);
  };

  return (
    <div>
      <div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Profile
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={handleSubmit}>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 space-y-6 bg-white sm:p-6">
                  {/* Full Name */}
                  <div>
                    {/* <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Full Name
                    </label>
                    <div className="flex mt-1 rounded-md shadow-sm">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="flex-1 block w-full text-blue-600 focus:outline-none border-gray-300 rounded-none focus:ring-indigo-500 rounded-r-md sm:text-sm"
                        value={data.name}
                        onChange={handleInput}
                      />
                    </div> */}

                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Display Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="name"
                      className="block w-full p-2 mt-1 bg-gray-100 border-gray-300 rounded-sm shadow-sm outline-none sm:text-sm"
                      value={data.name}
                      onChange={handleInput}
                    />
                  </div>
                  {/* Email Contact */}
                  <div>
                    <label
                      htmlFor="emailContact"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email Contact
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="emailContact"
                      className="block w-full p-2 mt-1 bg-gray-100 border-gray-300 rounded-sm shadow-sm outline-none sm:text-sm"
                      value={data.email}
                      onChange={handleInput}
                    />
                  </div>
                  {/* Address */}
                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      className="block w-full p-2 mt-1 bg-gray-100 border-gray-300 rounded-sm shadow-sm outline-none sm:text-sm"
                      value={data.address}
                      onChange={handleInput}
                    />
                  </div>
                  {/* Phone number */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone Number
                    </label>

                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      className="block w-full p-2 mt-1 bg-gray-100 border-gray-300 rounded-sm shadow-sm outline-none sm:text-sm"
                      value={data.phone}
                      onChange={handleInput}
                    />
                  </div>
                  {/* website */}
                  <div>
                    <label
                      htmlFor="website"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Website
                    </label>
                    <input
                      type="text"
                      name="website"
                      id="website"
                      className="block w-full text-blue-600 p-2 mt-1 bg-gray-100 border-gray-300 rounded-sm shadow-sm outline-none sm:text-sm"
                      placeholder="www.example.com"
                      value={data.website}
                      onChange={handleInput}
                    />
                  </div>
                  {/* About */}
                  <div>
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium text-gray-700"
                    >
                      About
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="about"
                        name="about"
                        rows={5}
                        className="block w-full p-2 bg-gray-100 border-gray-300 rounded-sm shadow-sm outline-none sm:text-sm"
                        placeholder="Brief description for your profile."
                        value={data.about}
                        onChange={handleInput}
                      />
                    </div>
                  </div>
                </div>

                {/* Button */}
                <div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
                  <button
                    disabled={loading}
                    type="submit"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:text-gray-500"
                  >
                    {loading ? 'loading...' : 'Save'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
