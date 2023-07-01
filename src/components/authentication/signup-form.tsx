import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selector, UserActions } from '@/redux';

const { v4: uuidv4 } = require('uuid');

export const SignupForm = ({ onClose }: { onClose: () => void }) => {
  const { allUser } = useSelector(selector.user);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<any>({});

  const dispatch = useDispatch();

  const allUsername = allUser.map((item: any) => item.username);

  const body = {
    id: uuidv4(),
    username,
    password,
    profile: { firstname: '', lastname: '' },
  };

  const _validate = () => {
    const errorObject: any = {};
    if (username === '') {
      errorObject.username = 'Please input your username';
    }
    if (allUsername.includes(username)) {
      errorObject.username = 'Please use another username';
    }
    if (password === '') {
      errorObject.password = 'Please input your password';
    }

    setErrors(errorObject);
    if (Object.keys(errorObject).length > 0) {
      return false;
    }
    return true;
  };

  const _onSignup = () => {
    if (!_validate()) {
      return;
    }
    const updatedAllUser = [...allUser, body];
    dispatch(UserActions.setAllUser(updatedAllUser));
    dispatch(UserActions.setCurrentUser(body));
  };

  return (
    <div className="flex flex-col gap-2">
      <div>User Name</div>
      <input
        type="text"
        className="rounded-md border-2 p-2"
        value={username}
        onChange={(e: any) => setUsername(e.target.value)}
      />
      <div className="text-red-500">{errors.username}</div>
      <div>Password</div>
      <input
        type="text"
        className="rounded-md border-2 p-2"
        value={password}
        onChange={(e: any) => setPassword(e.target.value)}
      />
      <div className="text-red-500">{errors.password}</div>
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
          onClick={_onSignup}
        >
          Signup
        </button>
      </div>
    </div>
  );
};
