import { useState } from 'react';

import { ModalCenter } from '../pages/home-page';
import { SignupForm } from './signup-form';

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
