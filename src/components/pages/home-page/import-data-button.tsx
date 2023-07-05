import { useState } from 'react';
import { useSelector } from 'react-redux';

import { selector } from '@/redux';

import { ImportDataForm } from './form-import-data';
import { ModalCenter } from './modal-center';

export const ImportDataButton = () => {
  const { currentUser } = useSelector(selector.user);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded-md bg-green-500 px-4 py-2 text-white"
      >
        Import Data
      </button>
      <ModalCenter open={isOpen} onClose={() => setIsOpen(false)}>
        {currentUser ? (
          <ImportDataForm onClose={() => setIsOpen(false)} />
        ) : (
          <div className="text-xl">Login to add new coin.</div>
        )}
      </ModalCenter>
    </div>
  );
};
