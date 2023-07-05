import { useState } from 'react';

import { ModalCenter } from '../pages/home-page';
import { EditProfileForm } from './edit-profile-form';

export const UserProfile = ({ currentUser }: { currentUser: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasName = !(
    currentUser.profile.firstname === '' && currentUser.profile.lastname === ''
  );
  return (
    <>
      {hasName ? (
        <div>
          Welcome {currentUser.profile.firstname} {currentUser.profile.lastname}
        </div>
      ) : (
        <div>Welcome {currentUser.username}</div>
      )}
      <button
        type="button"
        className="rounded-md bg-green-500 px-4 py-2 text-white"
        onClick={() => setIsOpen(true)}
      >
        Edit Profile
      </button>
      <ModalCenter open={isOpen} onClose={() => setIsOpen(false)}>
        <EditProfileForm onClose={() => setIsOpen(false)} />
      </ModalCenter>
    </>
  );
};
