import { ChevronRightIcon, TrashIcon } from '@heroicons/react/outline';
import { useState } from 'react';

import type { Coin } from '@/types/Coin';

import { DeleteCoinForm } from './form-delete-coin';
import { ModalCenter } from './modal-center';

export const CoinsTable = ({
  coins,
  coinDelete,
  onOpenTransactions,
}: {
  coins: Coin[];
  coinDelete: (coin: Coin) => void;
  onOpenTransactions: (coin: Coin) => void;
}) => {
  return (
    <table className="table-fixed text-left">
      <thead>
        <tr className="border-t">
          <th>#</th>
          <th>Coin</th>
          <th>Price</th>
          <th>Avg Price</th>
          <th>Holdings</th>
          <th>PNL</th>
        </tr>
      </thead>
      <tbody>
        {coins.map((coin, index) => (
          <tr key={coin.name} className="border-t ">
            <td>{index}</td>
            <td className="">
              <span className="mr-1 font-bold">{coin.name}</span>
              <span className="text-xs font-light">
                {coin.symbol.toLocaleUpperCase()}
              </span>
            </td>
            <td>{coin.price}</td>
            <td>24,120.81</td>
            <td>$1000 (10%) 0.1BTC</td>
            <td>$20.00 4%</td>
            <td className="flex flex-col items-center gap-1 py-1">
              <OpenTransactionsButton
                onOpenTransactions={() => onOpenTransactions(coin)}
              />
              <DeleteCoinButton onDeleteCoin={() => coinDelete(coin)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const OpenTransactionsButton = ({
  onOpenTransactions,
}: {
  onOpenTransactions: () => void;
}) => {
  return (
    <button type="button" className="" onClick={onOpenTransactions}>
      <ChevronRightIcon className="w-4" />
    </button>
  );
};

export const DeleteCoinButton = ({
  onDeleteCoin,
}: {
  onDeleteCoin: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button type="button" onClick={() => setIsOpen(true)}>
        <TrashIcon className="w-4" />
      </button>
      {isOpen ? (
        <ModalCenter open={isOpen} onClose={() => setIsOpen(false)}>
          <DeleteCoinForm
            onDeleteCoin={onDeleteCoin}
            onClose={() => setIsOpen(false)}
          />
        </ModalCenter>
      ) : null}
    </div>
  );
};
