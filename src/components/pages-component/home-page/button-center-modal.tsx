import { useState } from 'react';

import { ModalCenter } from './modal-center';

export const ButtonCenterModal = ({
  style,
  text,
  modalContent,
}: {
  style: any;
  text: string;
  modalContent: any;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button type="button" onClick={() => setIsOpen(true)} className={style}>
        {text}
      </button>
      <ModalCenter open={isOpen} onClose={() => setIsOpen(false)}>
        {modalContent}
      </ModalCenter>
    </div>
  );
};
