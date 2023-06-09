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
    <div className="transition duration-500	ease-in-out">
      <div className="fixed inset-0 bg-black/50" />
      <div className="fixed inset-x-1/2 inset-y-1/4 z-10">
        <div className="flex h-96 w-96 -translate-x-1/2 -translate-y-1/2 flex-col rounded-lg bg-white p-4">
          <button type="button" className="mb-4 text-left " onClick={onClose}>
            X
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};
