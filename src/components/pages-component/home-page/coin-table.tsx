import { useSelector } from 'react-redux';

import { selector } from '@/redux';
import {
  selectAvgNetCostList,
  selectHoldingsList,
  selectHoldingsValueList,
  selectPNL_List,
} from '@/redux/Data/DataRedux';

import { DeleteCoinButton } from './delete-coin-button';
import { OpenTransactionsButton } from './open-transactions-button';

export const CoinTable = () => {
  const { currentData } = useSelector(selector.data);

  const avgNetCostList = selectAvgNetCostList(currentData);
  const holdingsValueList = selectHoldingsValueList(currentData);
  const holdingsList = selectHoldingsList(currentData);
  const PNL_List = selectPNL_List(currentData);

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
          <tr key={coin.id} className="border-t ">
            <td>{index}</td>
            <td className="">
              <span className="mr-1 font-bold">{coin.name}</span>
              <span className="text-xs font-light">
                {coin.symbol.toLocaleUpperCase()}
              </span>
            </td>
            <td>{coin.price}</td>
            <td>${avgNetCostList[index].toFixed(3)}</td>
            <td>
              ${holdingsValueList[index].toFixed(3)} (10%){' '}
              {holdingsList[index].toFixed(3)}
              {coin.symbol.toLocaleUpperCase()}
            </td>
            <td>${PNL_List[index].toFixed(3)} 4%</td>
            <td className="flex flex-col items-center gap-1 py-1">
              <OpenTransactionsButton coin={coin} />
              <DeleteCoinButton deletedCoin={coin} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
