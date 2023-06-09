import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

import { Card } from '@/components/base';
import { CoinGeckoImages } from '@/components/images';
import { DataActions, selector, UserActions } from '@/redux';
import { selectTotalBalance, selectTotalPNL } from '@/redux/Data/DataRedux';
import { ApiInstance } from '@/services/api';
import { handleError } from '@/services/apiHelper';
import type { Coin } from '@/types/Coin';
import type { User } from '@/types/User';

import { AddCoinButton } from './add-coin-button';
import { AddCoinForm } from './add-coin-form';
import { BoardHeader } from './board-header';
import { CoinTable } from './coin-table';
import { ExportDataButton } from './export-data-button';
import { ImportDataButton } from './import-data-button';
import { ModalCenter } from './modal-center';

export const Board = () => {
  const { currentUser } = useSelector(selector.user);
  const { currentData } = useSelector(selector.data);

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

        <div className="flex items-center space-x-2">
          <ImportDataButton />
          <ExportDataButton data={currentData} />
        </div>
        <div className="flex items-center space-x-2">
          <UpdatePriceButton />
          <AddCoinButton />
        </div>
      </div>
      {currentUser && currentUser.data.length !== 0 ? (
        <CoinTable />
      ) : (
        <CoinGeckoNoCoin />
      )}
    </div>
  );
};

const CoinGeckoNoCoin = () => {
  const { currentUser } = useSelector(selector.user);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-full flex-col items-center border-t">
      <img
        src={CoinGeckoImages.ImageNoCoin.src}
        alt=""
        className="mt-24 w-64 drop-shadow-md "
      />
      <h2 className="pt-3 text-lg">You don&apos;t have any favorite coins.</h2>
      <h2
        onClick={() => setIsOpen(true)}
        className="cursor-pointer text-lg text-green-500 transition-all hover:text-green-700"
      >
        Add a new favorite coin to get started!
      </h2>
      <ModalCenter open={isOpen} onClose={() => setIsOpen(false)}>
        {currentUser ? (
          <AddCoinForm />
        ) : (
          <div className="text-xl">Login to add new coin.</div>
        )}
      </ModalCenter>
    </div>
  );
};

const UpdatePriceButton = () => {
  const { currentUser, allUser } = useSelector(selector.user);
  const { currentData } = useSelector(selector.data);

  const dispatch = useDispatch();
  const _refreshPrice = async () => {
    const ids = currentData.map((item: Coin) => item.id).join(',');

    const body = {
      ids,
      vs_currencies: 'usd',
      precision: '3',
    };

    const res = await ApiInstance.getTokenPrice(body);
    const { result, error } = handleError(res);
    if (error) {
      toast.error('Something wrong in fetch coin');
      return;
    }
    const updatedCurrentData = currentData.map((item: Coin) => ({
      ...item,
      price: result?.[item.id].usd,
    }));

    const updatedCurrentUser = { ...currentUser, data: updatedCurrentData };
    const updatedAlluser = allUser.map((user: User) => {
      if (user.id === updatedCurrentUser.id) {
        return updatedCurrentUser;
      }
      return user;
    });
    dispatch(UserActions.setCurrentUser(updatedCurrentUser));
    dispatch(UserActions.setAllUser(updatedAlluser));
    dispatch(DataActions.setCurrentData(updatedCurrentData));
  };
  return (
    <button
      type="button"
      onClick={_refreshPrice}
      className="rounded-md bg-green-500 px-4 py-2 text-white"
    >
      Update Price
    </button>
  );
};
