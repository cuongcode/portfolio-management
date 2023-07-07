import { PlusSmIcon } from '@heroicons/react/outline';
import { useState } from 'react';

import { AddNewPortfolioForm } from './form-add-new-portfolio';
import { ModalCenter } from './modal-center';

export const CreatePortfolioButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center"
      >
        <PlusSmIcon className="mr-2 w-5" />
        <div> Create Portfolio</div>
      </button>
      <ModalCenter open={isOpen} onClose={() => setIsOpen(false)}>
        <AddNewPortfolioForm />
      </ModalCenter>
    </div>
  );
};
