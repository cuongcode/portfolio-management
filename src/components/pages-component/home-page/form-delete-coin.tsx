import React from 'react';

import type { Coin } from '@/types/Coin';

export const DeleteCoinForm = ({
  coin,
  onDeleteCoin,
}: {
  coin: Coin;
  onDeleteCoin: (coin: Coin) => void;
}) => {
  const _onFormSubmit = () => {
    onDeleteCoin(coin);
  };
  return (
    <div className="flex flex-col">
      <div className="text-3xl">Remove Coin</div>
      <div>Are you sure want to remove this coin?</div>
      <div>
        Any transactions associated with this coin will also be removed.
      </div>
      <div className="mt-10 flex space-x-2">
        <button type="button" className="grow rounded-md border-2 py-2">
          No
        </button>
        <button
          type="button"
          className="grow rounded-md bg-green-500 py-2"
          onClick={_onFormSubmit}
        >
          Yes
        </button>
      </div>
    </div>
  );
};
