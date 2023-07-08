import { useMemo } from 'react';

import { useCheckClickOutside } from '@/custom-hooks/use-check-click-outside';
import { useToggle } from '@/custom-hooks/useToggle';

import { ModalCenter } from '../pages/home-page';
import { ClearAllUserDataButton } from './clear-all-user-data-button';
import { EditProfileForm } from './edit-profile-form';
import { LogoutButton } from './logout-button';

export const UserProfile = ({ currentUser }: { currentUser: any }) => {
  const [isModalOpen, toggleIsModalOpen] = useToggle(false);
  const [isDropdownShow, toggleIsDropdownShow, , setIsDropdownInvisible] =
    useToggle(false);

  const hasName = useMemo(() => {
    return !(
      currentUser.profile.firstname === '' &&
      currentUser.profile.lastname === ''
    );
  }, [currentUser]);

  const popupRef = useCheckClickOutside(() => {
    setIsDropdownInvisible();
  });

  return (
    <>
      <div className="w-full" ref={popupRef}>
        <button
          style={{ width: '100%' }}
          id="dropdownDefaultButton"
          data-dropdown-toggle="dropdown"
          className="inline-flex items-center rounded-lg bg-green-500 px-4 py-2.5 text-center text-base font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300"
          onClick={toggleIsDropdownShow}
        >
          {hasName ? (
            <div>
              Welcome {currentUser.profile.firstname}{' '}
              {currentUser.profile.lastname}
            </div>
          ) : (
            <div>Welcome {currentUser.username}</div>
          )}
          <svg
            className="ml-2 h-4 w-4"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        <div
          id="dropdown"
          className={`absolute z-10 cursor-pointer divide-y divide-gray-100 rounded bg-white text-base shadow ${
            isDropdownShow ? 'block' : 'hidden'
          }`}
        >
          <ul className="w-56 py-2 text-sm text-gray-700 dark:text-gray-200">
            <li>
              <p
                className="relative block px-4 py-2 text-base hover:bg-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={toggleIsModalOpen}
              >
                Edit profile
              </p>
            </li>
            <li>
              <ClearAllUserDataButton />
            </li>
            <li>
              <LogoutButton />
            </li>
          </ul>
        </div>
      </div>
      <ModalCenter open={isModalOpen} onClose={toggleIsModalOpen}>
        <EditProfileForm onClose={toggleIsModalOpen} />
      </ModalCenter>
    </>
  );
};
