import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ModalCenter } from '@/components/pages-component/home-page';
import { selector, UserActions } from '@/redux';

import { LoginForm } from './login-form';
import { SignupForm } from './signup-form';

export const LoginSection = () => {
  const { currentUser } = useSelector(selector.user);
  return (
    <>
      {currentUser && (
        <div>
          Welcome {currentUser?.profile.firstname}{' '}
          {currentUser?.profile.lastname}
        </div>
      )}
      <div className="flex items-center">
        {!currentUser ? (
          <div className="flex items-center gap-2">
            <LoginButton />
            <SignUpButton />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            {currentUser?.username === 'admin' && <ClearAllUserDataButton />}
            <LogoutButton />
          </div>
        )}
      </div>
    </>
  );
};

export const LoginButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        className="rounded-md bg-green-500 px-4 py-2 text-white"
        onClick={() => setIsOpen(true)}
      >
        Login
      </button>
      <ModalCenter open={isOpen} onClose={() => setIsOpen(false)}>
        <LoginForm onClose={() => setIsOpen(false)} />
      </ModalCenter>
    </>
  );
};

export const SignUpButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        className="rounded-md bg-green-500 px-4 py-2 text-white"
        onClick={() => setIsOpen(true)}
      >
        Sign Up
      </button>
      <ModalCenter open={isOpen} onClose={() => setIsOpen(false)}>
        <SignupForm onClose={() => setIsOpen(false)} />
      </ModalCenter>
    </>
  );
};

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

const ClearAllUserDataButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const _clearData = () => {
    dispatch(UserActions.setAllUser([]));
  };
  return (
    <>
      <button
        type="button"
        className="rounded-md bg-green-500 px-4 py-2 text-white"
        onClick={() => setIsOpen(true)}
      >
        Clear
      </button>
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
