import { useState } from 'react';
import Settings from 'components/profile/settings';
import Show from 'components/profile/show';

const Profile = () => {
  const [onSetting, setOnSetting] = useState(false);

  return (
    <>
      {onSetting ? (
        <Settings setOnSetting={setOnSetting} />
      ) : (
        <Show setOnSetting={setOnSetting} />
      )}
    </>
  );
};

export default Profile;
