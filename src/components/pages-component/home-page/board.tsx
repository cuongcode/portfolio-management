import Router from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { ApiInstance } from '@/services/api';
import { handleError } from '@/services/apiHelper';

import { ButtonCenterModal } from './button-center-modal';
import { AddNewCoinForm } from './form-add-new-coin';
import { CoinsTable } from './table-coins';

export const Board = () => {
  const [coins, setCoins] = useState<any[]>([]);

  const coinAddHanlde = async (coin: string) => {
    // https://pro-api.coingecko.com/api/v3/

    const body = {
      ids: coin?.id,
      vs_currencies: 'usd',
      precision: '3',
    };

    const res = await ApiInstance.getTokenPrice(body);
    const { result, error } = handleError(res);
    if (error) {
      console.log('Something wrong in fetch coin', error.message);
      toast.error('Something wrong in fetch coin');
      return;
    }
    if (coin?.id) {
      const coinPrice = result?.[coin?.id].usd;
      // const newCoin = {
      //   symbol: coin?.symbol,
      //   name: coin?.name,
      //   price: coinPrice,
      // };
      const newCoin = { ...coin, price: coinPrice, transactions: [] };

      setCoins((current) => [...current, newCoin]);
    }
  };

  const coinDeleteHandle = (deleteCoin: any) => {
    setCoins((current) => {
      const newCoins = current.filter(
        (coin) => coin.symbol !== deleteCoin.symbol
      );
      return newCoins;
    });
  };

  const handleAddTransaction = (transaction) => {
    console.log('add');
  };

  const coinTransactionsHandle = (coin: any) => {
    Router.push(`/transactions/${coin.symbol}`);
    Router.push({
      pathname: `/transactions/${coin.symbol}`,
      query: {
        addTransaction: handleAddTransaction,
        abc: coin,
      },
    });
  };

  return (
    <div className="flex min-h-screen flex-col rounded-md border-[1px] border-gray-400 p-4">
      <div className="mb-10 flex justify-between">
        <div className="flex items-center">
          <h3 className="mr-2 font-bold">My Portfolio</h3>
          {/* add icon here to modify portfolio eg: rename, delete, ... */}
          <div className=" cursor-pointer ">+</div>
        </div>
        <ButtonCenterModal
          style="
            rounded-md
            bg-green-500
            px-4 py-2
            text-white
            transition
            delay-150
            hover:scale-110
            duration-300
            hover:-translate-y-1"
          text="Add New Coin"
          modalContent={<AddNewCoinForm onFormSubmit={coinAddHanlde} />}
        />
      </div>

      {/* show total cards */}
      <div className="mb-10 flex">
        <div className=" mr-6 p-4 shadow-md">
          <div>$5000.00</div>
          <div>Total Balance</div>
        </div>
        <div className=" mr-6 p-4 shadow-md">
          <div>$1000.00</div>
          <div>Total Profit Loss</div>
        </div>
      </div>

      <CoinsTable
        coins={coins}
        coinDelete={coinDeleteHandle}
        coinTransactions={coinTransactionsHandle}
      />
    </div>
  );
};
