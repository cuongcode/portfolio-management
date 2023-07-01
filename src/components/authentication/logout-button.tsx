import { useDispatch } from 'react-redux';

import { UserActions } from '@/redux';

export const LogoutButton = () => {
  const dispatch = useDispatch();

  const _onLogout = () => {
    dispatch(UserActions.setCurrentUser(undefined));
  };

  return (
    <button
      type="button"
      className="rounded-md bg-green-500 px-4 py-2 text-white"
      onClick={_onLogout}
    >
      Logout
    </button>
  );
};
