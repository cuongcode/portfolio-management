import { useState } from 'react';

import { ModalLeftSide } from './modal-left-side';

export const ButtonLeftSideModal = ({
  tailwindStyle,
  text,
  modalContent,
}: {
  tailwindStyle: string;
  text: string;
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
        {text}
      </button>
      <ModalLeftSide open={isOpen} onClose={() => setIsOpen(false)}>
        {modalContent}
      </ModalLeftSide>
    </div>
  );
};
