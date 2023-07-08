import React from 'react';
import { useSelector } from 'react-redux';

import { selector } from '@/redux';

import { ClearAllUserDataButton } from './clear-all-user-data-button';
import { LoginButton } from './login-button';
import { LogoutButton } from './logout-button';
import { SignUpButton } from './signup-button';
import { UserProfile } from './user-profile';

export const LoginSection = () => {
  const { currentUser } = useSelector(selector.user);
  return (
    <div className="flex items-center gap-2">
      {currentUser.id && <UserProfile currentUser={currentUser} />}

      {!currentUser.id ? (
        <>
          <LoginButton />
          <SignUpButton />
        </>
      ) : (
        <>
          {currentUser.username === 'admin' && <ClearAllUserDataButton />}
          <LogoutButton />
        </>
      )}
    </div>
  );
};
