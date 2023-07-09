import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DataActions, selector } from '@/redux';
import {
  selectAvgNetCostList,
  selectCurrentPriceList,
  selectHoldingsList,
  selectHoldingsValueList,
  selectPNL_List,
} from '@/redux/Data/DataRedux';
import type { Coin } from '@/types/Coin';

import { DeleteCoinButton } from './delete-coin-button';
import { OpenTransactionsButton } from './open-transactions-button';

export const CoinTable = () => {
  const { currentData } = useSelector(selector.data);
  const { currentUser } = useSelector(selector.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (currentUser) {
      dispatch(DataActions.setCurrentData(currentUser.data));
    }
  }, []);

  const avgNetCostList = selectAvgNetCostList(currentData);
  const holdingsValueList = selectHoldingsValueList(currentData);
  const holdingsList = selectHoldingsList(currentData);
  const PNL_List = selectPNL_List(currentData);
  const currentPriceList = selectCurrentPriceList(currentData);
  const coinSymbolList = currentData.map((item: Coin) => item.symbol);

  const coinSymbolCol = { head: 'Coin', data: coinSymbolList };
  const currentPriceCol = { head: 'Price', data: currentPriceList };
  const avgPriceCol = { head: 'Avg Price', data: avgNetCostList };
  const holdingsCol = { head: 'Holdings', data: holdingsList };
  const pnlCol = { head: 'PNL', data: PNL_List };
  const holdingsValueCol = { head: '', data: holdingsValueList };

  return (
    <table className="table-fixed text-left">
      <thead>
        <tr className="border-t">
          <th>{coinSymbolCol.head}</th>
          <th>{currentPriceCol.head}</th>
          <th>{avgPriceCol.head}</th>
          <th>{holdingsCol.head}</th>
          <th>{pnlCol.head}</th>
        </tr>
      </thead>
      <tbody>
        {currentData.map((coin: Coin, index: number) => (
          <tr key={coin.id} className="border-t ">
            <td className="">
              <span className="mr-1 font-bold">{coin.name}</span>
              <span className="text-xs font-light">
                {coinSymbolCol.data[index].toLocaleUpperCase()}
              </span>
            </td>
            <td>{currentPriceCol.data[index]}</td>
            <td>${avgPriceCol.data[index].toFixed(3)}</td>
            <td>
              ${holdingsValueCol.data[index].toFixed(3)} (10%){' '}
              {holdingsCol.data[index].toFixed(3)}
              {coinSymbolCol.data[index].toLocaleUpperCase()}
            </td>
            <td>${pnlCol.data[index].toFixed(3)} 4%</td>
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
