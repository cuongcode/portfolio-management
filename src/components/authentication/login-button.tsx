import { useState } from 'react';

import { ModalCenter } from '../pages/home-page';
import { LoginForm } from './login-form';

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
