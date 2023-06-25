import { UserCircleIcon } from '@heroicons/react/outline';
import React, { useContext } from 'react';

import { DataContext } from '@/utils/data-context';

import { Button } from '../../button';
import { ModalLogin } from './modal-login';

export const LoginSection = () => {
  const { saveDataToUser, userInfo } = useContext(DataContext);
  const [showModalLogin, setShowModalLogin] = React.useState(false);
  return (
    <>
      <UserInfo userInfo={userInfo} />
      <BtRow
        userInfo={userInfo}
        onSignup={() => setShowModalLogin(true)}
        onSave={saveDataToUser}
      />
      <ModalLogin
        open={showModalLogin}
        onClose={() => setShowModalLogin(false)}
      />
    </>
  );
};

const UserInfo = ({ userInfo }: { userInfo: any }) => {
  return (
    <div>
      User {userInfo?.username}:{userInfo?.password}
    </div>
  );
};

const BtRow = ({
  userInfo,
  onSignup,
  onSave,
}: {
  userInfo: any;
  onSignup: () => void;
  onSave: () => void;
}) => {
  return (
    <div className="flex items-center">
      {!userInfo ? (
        <div className="flex items-center gap-2">
          <Button>Login</Button>
          <Button onClick={onSignup}>Signup</Button>
          <button type="button" onClick={onSave}>
            Save
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <UserCircleIcon className="w-7" />
          <Button>Signout</Button>
        </div>
      )}
    </div>
  );
};
