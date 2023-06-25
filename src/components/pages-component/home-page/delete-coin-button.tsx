import { TrashIcon } from '@heroicons/react/outline';
import { useState } from 'react';

import { DeleteCoinForm } from './form-delete-coin';
import { ModalCenter } from './modal-center';

export const DeleteCoinButton = ({
  onDeleteCoin,
}: {
  onDeleteCoin: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button type="button" onClick={() => setIsOpen(true)}>
        <TrashIcon className="w-4" />
      </button>
      {isOpen ? (
        <ModalCenter open={isOpen} onClose={() => setIsOpen(false)}>
          <DeleteCoinForm
            onDeleteCoin={onDeleteCoin}
            onClose={() => setIsOpen(false)}
          />
        </ModalCenter>
      ) : null}
    </div>
  );
};
