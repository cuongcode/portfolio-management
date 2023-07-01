import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selector, UserActions } from '@/redux';

export const EditProfileForm = ({ onClose }: { onClose: () => void }) => {
  const { allUser, currentUser } = useSelector(selector.user);
  const [firstname, setFirstname] = useState('');
  const [lastname, setFLastname] = useState('');

  const { firstname: currentFirstname, lastname: currentLasttname } =
    currentUser.profile;

  useEffect(() => {
    setFirstname(currentFirstname);
    setFLastname(currentLasttname);
  }, []);

  const dispatch = useDispatch();

  const _onSave = () => {
    const updatedProfile = {
      ...currentUser.profile,
      firstname,
      lastname,
    };
    const updatedUser = { ...currentUser, profile: updatedProfile };
    const updatedAllUser = allUser.map((item: any) => {
      if (item.id === updatedUser.id) {
        return updatedUser;
      }
      return item;
    });
    dispatch(UserActions.setAllUser(updatedAllUser));
    dispatch(UserActions.setCurrentUser(updatedUser));
  };

  return (
    <div className="flex flex-col gap-2">
      <div>Fisrt Name</div>
      <input
        type="text"
        className="rounded-md border-2 p-2"
        value={firstname}
        onChange={(e: any) => setFirstname(e.target.value)}
      />
      <div>Last Name</div>
      <input
        type="text"
        className="rounded-md border-2 p-2"
        value={lastname}
        onChange={(e: any) => setFLastname(e.target.value)}
      />
      <div className="flex gap-2">
        <button
          type="button"
          className="grow rounded-md bg-green-500 px-4 py-2 text-white"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          type="button"
          className="grow rounded-md bg-green-500 px-4 py-2 text-white"
          onClick={_onSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};
