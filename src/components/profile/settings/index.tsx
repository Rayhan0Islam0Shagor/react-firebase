import React from 'react';
import Account from './Account';
import ChangePassword from './ChangePassword ';
import ProfileForm from './ProfileForm';

interface IProps {
  setOnSetting: (onSetting: boolean) => void;
}

const Settings: React.FC<IProps> = ({ setOnSetting }) => {
  return (
    <div className="p-3 rounded-md shadow">
      {/* ProfileForm */}
      <ProfileForm setOnSetting={setOnSetting} />

      {/* Account */}
      <Account />

      {/* Change Password */}
      <ChangePassword />
      <button
        onClick={() => setOnSetting(false)}
        className="px-4 py-2 mt-5 font-semibold tracking-wider text-white uppercase bg-gray-500 rounded-md hover:bg-gray-600"
      >
        Cancel
      </button>
    </div>
  );
};

export default Settings;
