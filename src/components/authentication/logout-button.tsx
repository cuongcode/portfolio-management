import { useDispatch, useSelector } from 'react-redux';

import { DataActions, selector, UserActions } from '@/redux';

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
    dispatch(UserActions.setCurrentUser(undefined));
    dispatch(DataActions.setCurrentData([]));
  };

  return (
    <p
      className="block cursor-pointer px-4 py-2 text-base hover:bg-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
      onClick={_onLogout}
    >
      Logout
    </p>
  );
};
