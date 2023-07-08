import { useDispatch, useSelector } from 'react-redux';

import { DataActions, selector, UserActions } from '@/redux';
import { EMPTY_USER } from '@/utils/empty-user';

export const LogoutButton = () => {
  const { allUser, currentUser } = useSelector(selector.user);
  const { currentData } = useSelector(selector.data);
  const dispatch = useDispatch();

  const _onLogout = () => {
    const updatedCurrentUser = { ...currentUser, data: currentData };
    const updatedAllUser = allUser.map((item: any) => {
      if (item.id === updatedCurrentUser.id) {
        return updatedCurrentUser;
      }
      return item;
    });
    dispatch(UserActions.setAllUser(updatedAllUser));
    dispatch(UserActions.setCurrentUser(EMPTY_USER));
    dispatch(DataActions.setCurrentData([]));
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
