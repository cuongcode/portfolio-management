import { ChevronRightIcon, TrashIcon } from '@heroicons/react/outline';

import type { Coin } from '@/types/Coin';

import { ButtonCenterModal } from './button-center-modal';
import { DeleteCoinForm } from './form-delete-coin';

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
              <td>
                <span className="mr-2 font-bold">
                  {coin.name.toUpperCase()}
                </span>
                <span className="text-xs font-light">
                  {coin.symbol.toLocaleUpperCase()}
                </span>
              </td>
              <td>{coin.price}</td>
              <td>24,120.81</td>
              <td>$1000 (10%) 0.1BTC</td>
              <td>$20.00 4%</td>
              <td className="flex flex-col items-center py-1">
                <button
                  type="button"
                  className="mb-1 w-fit"
                  onClick={() => coinTransactions(coin)}
                >
                  <ChevronRightIcon className="w-4" />
                </button>
                {/* <button
                  type="button"
                  className="w-fit"
                  onClick={() => coinDelete(coin)}
                >
                  <TrashIcon className="w-4" />
                </button> */}
                <ButtonCenterModal
                  tailwindStyle="w-fit"
                  modalContent={
                    <DeleteCoinForm coin={coin} onDeleteCoin={coinDelete} />
                  }
                >
                  <TrashIcon className="w-4" />
                </ButtonCenterModal>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
