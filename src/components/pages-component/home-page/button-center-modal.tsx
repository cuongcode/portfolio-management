import type { ReactNode } from 'react';
import { useState } from 'react';

import { ModalCenter } from './modal-center';

export const ButtonCenterModal = ({
  windtailStyle,
  children,
  modalContent,
}: {
  windtailStyle: any;
  children: ReactNode;
  modalContent: any;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={windtailStyle}
      >
        {children}
      </button>
      <ModalCenter open={isOpen} onClose={() => setIsOpen(false)}>
        {modalContent}
      </ModalCenter>
    </div>
  );
};
