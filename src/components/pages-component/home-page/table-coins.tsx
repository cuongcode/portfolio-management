import { ChevronRightIcon } from '@heroicons/react/outline';

import type { Coin } from '@/types/Coin';

import { AddTransactionForm } from '../transaction-page/form-add-transaction';
import { ButtonLeftSideModal } from './button-left-side-modal';

export const CoinsTable = ({
  coins,
  coinDelete,
  coinTransactions,
}: {
  coins: Coin[];
  coinDelete: (coin: Coin) => void;
  coinTransactions: (coin: Coin) => void;
}) => {
  return (
    <>
      {/* table */}
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
            <tr key={coin.name} className="border-t">
              <td>{index}</td>
              <td>{coin.symbol}</td>
              <td>{coin.price}</td>
              <td>24,120.81</td>
              <td>$1000 (10%) 0.1BTC</td>
              <td>$20.00 4%</td>
              <td className="flex flex-col items-center">
                {/* <button>+</button> */}
                <ButtonLeftSideModal
                  text="+"
                  tailwindStyle=""
                  modalContent={<AddTransactionForm />}
                />
                <button
                  type="button"
                  className="w-fit"
                  onClick={() => coinDelete(coin)}
                >
                  -
                </button>
                <button
                  type="button"
                  className="w-fit"
                  onClick={() => coinTransactions(coin)}
                >
                  <ChevronRightIcon className="w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
