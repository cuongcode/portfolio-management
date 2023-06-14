import type { ReactNode } from 'react';
import { useState } from 'react';

import { ModalCenter } from './modal-center';

export const ButtonCenterModal = ({
  tailwindStyle,
  children,
  modalContent,
}: {
  tailwindStyle: any;
  children: ReactNode;
  modalContent: any;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={tailwindStyle}
      >
        {children}
      </button>
      <ModalCenter open={isOpen} onClose={() => setIsOpen(false)}>
        {modalContent}
      </ModalCenter>
    </div>
  );
};
