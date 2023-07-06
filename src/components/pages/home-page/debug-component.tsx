import { useSelector } from 'react-redux';

import { selector } from '@/redux';
import type { User } from '@/types/User';

export const DebugComponent = () => {
  const { allUser, currentUser } = useSelector(selector.user);
  const { currentData } = useSelector(selector.data);
  return (
    <div className="flex flex-col gap-2">
      {allUser?.map((item: User) => (
        <div key={item.id} className="flex gap-2">
          <div>username: {item.username}</div>
          <div>password: {item.password}</div>
          <div>fisrtname: {item.profile.firstname}</div>
          <div>lastname: {item.profile.lastname}</div>
          <div>data: {item.data.toString()}</div>
        </div>
      ))}
      <div className="flex flex-col gap-2">
        <div>current user data: {currentUser?.data.toString()}</div>
        <div>current data: {currentData.toString()}</div>
      </div>
    </div>
  );
};
