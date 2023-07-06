import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

import { Card } from '@/components/base';
import { selector, UserActions } from '@/redux';
import { selectTotalBalance, selectTotalPNL } from '@/redux/Data/DataRedux';
import { ApiInstance } from '@/services/api';
import { handleError } from '@/services/apiHelper';

import { AddCoinButton } from './add-coin-button';
import { BoardHeader } from './board-header';
import { CoinTable } from './coin-table';
import { ExportDataButton } from './export-data-button';
import { ImportDataButton } from './import-data-button';

export const Board = () => {
  const { currentUser, allUser } = useSelector(selector.user);
  const { currentData } = useSelector(selector.data);

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
        const updatedCurrentUser = { ...currentUser, data: updatedCurrentData };
        const updatedAlluser = allUser.map((user: any) => {
          if (user.id === updatedCurrentUser.id) {
            return updatedCurrentUser;
          }
          return user;
        });
        dispatch(UserActions.setCurrentUser(updatedCurrentUser));
        dispatch(UserActions.setAllUser(updatedAlluser));
      }
    });
  }, []);

  const totalBalance = selectTotalBalance(currentData);
  const totalPNL = selectTotalPNL(currentData);

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
          <ImportDataButton />
          <ExportDataButton data={currentData} />
        </div>
        <AddCoinButton />
      </div>

      <CoinTable />
    </div>
  );
};
