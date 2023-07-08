import { useState } from 'react';

import type { Coin } from '@/types/Coin';

import { ModalCenter } from '../home-page';
import { AddTransactionForm } from './form-add-transaction';

export const AddTransactionButton = ({
  coin,
  holdings,
  avgNetCost,
}: {
  coin: Coin;
  holdings: number;
  avgNetCost: number;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded-md bg-green-500 px-4 py-2 text-white"
      >
        Add Transaction
      </button>
      <ModalCenter open={isOpen} onClose={() => setIsOpen(false)}>
        <AddTransactionForm
          coin={coin}
          holdings={holdings}
          avgNetCost={avgNetCost}
          onClose={() => setIsOpen(false)}
        />
      </ModalCenter>
    </div>
  );
};
