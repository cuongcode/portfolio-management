import { useSelector } from 'react-redux';

import { selector } from '@/redux';
import type { Coin } from '@/types/Coin';

import { DeleteCoinButton } from './delete-coin-button';
import { OpenTransactionsButton } from './open-transactions-button';

export const CoinTable = ({
  onOpenTransactions,
}: {
  onOpenTransactions: (coin: Coin) => void;
}) => {
  const { currentData } = useSelector(selector.data);

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
        {currentData?.map((coin: any, index: any) => (
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
              <DeleteCoinButton deletedCoin={coin} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
