import React, { useState } from 'react';

import { ModalCenter } from '@/components/pages-component/home-page';

import { SignupForm } from './signup-form';

export const LoginSection = () => {
  const userInfo = null;
  return (
    <>
      <UserInfo userInfo={userInfo} />
      <BtRow userInfo={userInfo} />
      {/* <ModalLogin open={} onClose={} /> */}
    </>
  );
};

const UserInfo = ({ userInfo }: { userInfo: any }) => {
  return (
    <div>
      User {userInfo?.username}:{userInfo?.password}
    </div>
  );
};

const BtRow = ({ userInfo }: { userInfo: any }) => {
  return (
    <div className="flex items-center">
      {!userInfo ? (
        <div className="flex items-center gap-2">
          <LoginButton />
          <SignUpButton />
          {/* <button type="button">Save</button> */}
        </div>
      ) : (
        <div className="flex gap-2">
          <button
            type="button"
            className="rounded-md bg-green-500 px-4 py-2 text-white"
          >
            Logout
          </button>
        </div>
      )}
    </div>
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
        <SignupForm onClose={() => setIsOpen(false)} />
      </ModalCenter>
    </>
  );
};

export const SignUpButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
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
    </div>
  );
};
