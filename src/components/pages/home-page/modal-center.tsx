import { XIcon } from '@heroicons/react/outline';
import { type ReactNode } from 'react';

import { useCheckClickOutside } from '@/custom-hooks/use-check-click-outside';

export const ModalCenter = ({
  open,
  children,
  onClose,
}: {
  open: boolean;
  children: ReactNode;
  onClose: () => void;
}) => {
  const popupRef = useCheckClickOutside(() => {
    onClose();
  });

  // SHOULD MAKE CLICK OUTSIDE TO CLOSE MODAL
  if (!open) return null;
  return (
    // try to make animation here but fail
    <div className="fixed inset-0 z-10 flex h-screen w-screen flex-col items-center justify-center bg-black/60 transition duration-500	ease-in-out">
      <div
        ref={popupRef}
        className="flex h-fit w-96 flex-col rounded-lg bg-white p-4"
      >
        <button type="button" className="mb-4 text-left " onClick={onClose}>
          <XIcon className="w-6" />
        </button>
        {children}
      </div>
    </div>
  );
};
