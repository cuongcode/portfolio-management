import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { UserActions } from '@/redux';

import { ModalCenter } from '../pages/home-page';

export const ClearAllUserDataButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const _clearData = () => {
    dispatch(UserActions.setAllUser([]));
  };
  return (
    <>
      <p className="block cursor-pointer px-4 py-2 text-base hover:bg-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">
        Clear
      </p>
      <ModalCenter open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="flex flex-col gap-2">
          <div>Are you sure to clear all user data ?</div>
          <div className="flex gap-2">
            <button
              className="grow rounded-md bg-green-500 px-4 py-2 text-white"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button
              className="grow rounded-md bg-red-500 px-4 py-2 text-white"
              onClick={_clearData}
            >
              Yes, I do.
            </button>
          </div>
        </div>
      </ModalCenter>
    </>
  );
};
