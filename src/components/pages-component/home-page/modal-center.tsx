import type { ReactNode } from 'react';

export const ModalCenter = ({
  open,
  children,
  onClose,
}: {
  open: boolean;
  children: ReactNode;
  onClose: () => void;
}) => {
  if (!open) return null;
  return (
    // try to make animation here but fail
    <div className="fixed inset-0 flex h-screen w-screen flex-col items-center justify-center bg-black/60 transition duration-500	ease-in-out">
      <div className="flex h-96 w-96 flex-col rounded-lg bg-white p-4">
        <button type="button" className="mb-4 text-left " onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>
  );
};
