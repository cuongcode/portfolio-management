import { useState } from 'react';
import { useSelector } from 'react-redux';

import { selector } from '@/redux';

import { AddCoinForm } from './add-coin-form';
import { ModalCenter } from './modal-center';

export const AddCoinButton = () => {
  const { currentUser } = useSelector(selector.user);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded-md bg-green-500 px-4 py-2 text-white"
      >
        Add New Coin
      </button>
      <ModalCenter open={isOpen} onClose={() => setIsOpen(false)}>
        {currentUser ? (
          <AddCoinForm />
        ) : (
          <div className="text-xl">Login to add new coin.</div>
        )}
      </ModalCenter>
    </div>
  );
};
