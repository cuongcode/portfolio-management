import React from 'react';

export const DeleteCoinForm = ({
  onDeleteCoin,
  onClose,
}: {
  onDeleteCoin: () => void;
  onClose: () => void;
}) => {
  return (
    <div className="flex flex-col">
      <div className="text-3xl">Remove Coin</div>
      <div>Are you sure want to remove this coin?</div>
      <div>
        Any transactions associated with this coin will also be removed.
      </div>
      <div className="mt-10 flex space-x-2">
        <button
          type="button"
          className="grow rounded-md border-2 py-2"
          onClick={onClose}
        >
          No
        </button>
        <button
          type="button"
          className="grow rounded-md bg-green-500 py-2"
          onClick={onDeleteCoin}
        >
          Yes
        </button>
      </div>
    </div>
  );
};
