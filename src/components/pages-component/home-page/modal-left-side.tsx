import type { ReactNode } from 'react';

export const ModalLeftSide = ({
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
    <>
      <div className="fixed inset-0  bg-black bg-opacity-50" />
      <div className="z-1 fixed left-0 top-0">
        <div className="flex w-[50vw] flex-col bg-white p-4">
          <button type="button" className="mb-4 text-left" onClick={onClose}>
            X
          </button>
          {children}
        </div>
      </div>
    </>
  );
};
