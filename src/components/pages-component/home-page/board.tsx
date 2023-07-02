import React, { useContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

import { Card } from '@/components/base';
import { DataActions, selector } from '@/redux';
import { ApiInstance } from '@/services/api';
import { handleError } from '@/services/apiHelper';
import { sumOfNumberArray, zipArray } from '@/utils/base';
import { DataContext } from '@/utils/data-context';

import { AddCoinButton } from './add-coin-button';
import { BoardHeader } from './board-header';
import { CoinTable } from './coin-table';
import { ExportDataButton } from './export-data-button';
import { ImportDataButton } from './import-data-button';

export const Board = () => {
  const { currentData } = useSelector(selector.data);
  const { onImportData } = useContext(DataContext);

  const dispatch = useDispatch();
  useEffect(() => {
    currentData.map(async (item: any) => {
      const body = {
        ids: item?.id,
        vs_currencies: 'usd',
        precision: '3',
      };
      const res = await ApiInstance.getTokenPrice(body);
      const { result, error } = handleError(res);
      if (error) {
        toast.error('Something wrong in fetch coin');
        return;
      }
      if (item?.id) {
        const coinPrice = result?.[item.id]?.usd;
        const updateCoin = { ...item, price: coinPrice };
        const updatedCurrentData = currentData.map((prev: any) => {
          if (prev.id === updateCoin.id) {
            return updateCoin;
          }
          return prev;
        });
        dispatch(DataActions.setCurrentData(updatedCurrentData));
      }
    });
  }, []);

  const currentPriceList = currentData.map((item: any) => item.price);

  const totalCostList = currentData.map((item: any) => {
    return sumOfNumberArray(
      item?.transactions.map((trans: any) => {
        if (trans.buy) {
          return trans.price * trans.quantity;
        }
        return trans.avgNetCost * trans.quantity;
      })
    );
  });

  const holdingsList = currentData.map((item: any) => {
    if (item?.transactions.length === 0) {
      return 0;
    }
    return sumOfNumberArray(
      item?.transactions.map((trans: any) => trans.quantity)
    );
  });

  const avgNetCostList = zipArray(totalCostList, holdingsList, (a, b) => a / b);

  const holdingsValueList = zipArray(
    currentPriceList,
    holdingsList,
    (a, b) => a * b
  );

  const PNL_List = zipArray(holdingsValueList, totalCostList, (a, b) => a - b);

  const totalBalance = sumOfNumberArray(totalCostList);

  const totalPNL = sumOfNumberArray(PNL_List);

  return (
    <div className="flex min-h-screen flex-col rounded-md border-[1px] border-gray-400 p-4">
      <div className="mb-10 flex justify-between">
        <BoardHeader portfolioName="My Portfolio" />
      </div>

      <div className="mb-10 flex justify-between">
        <div className="flex">
          <Card title="Total Balance" number={totalBalance} showColor={false} />
          <Card title="Total Profit Loss" number={totalPNL} showColor />
        </div>

        <div className="flex space-x-2">
          <ImportDataButton onImportData={onImportData} />
          <ExportDataButton data={currentData} />
        </div>
        <AddCoinButton />
      </div>

      <CoinTable
        data={currentData}
        avgNetCostList={avgNetCostList}
        holdingsValueList={holdingsValueList}
        holdingsList={holdingsList}
        PNL_List={PNL_List}
      />
    </div>
  );
};
