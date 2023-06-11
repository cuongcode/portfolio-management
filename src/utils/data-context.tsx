import Router from 'next/router';
import type { ReactNode } from 'react';
import React, { createContext, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

import { ApiInstance } from '@/services/api';
import { handleError } from '@/services/apiHelper';
import type { Coin } from '@/types/Coin';

import { staticData } from './static-data';

export const DataContext = createContext<Coin[]>([]);

export const DataContextProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<Coin[]>(staticData);

  const coinAddHandle = async (coin: Coin) => {
    const body = {
      ids: coin.id,
      vs_currencies: 'usd',
      precision: '3',
    };
    const res = await ApiInstance.getTokenPrice(body);
    const { result, error } = handleError(res);
    if (error) {
      toast.error('Something wrong in fetch coin');
      return;
    }
    if (coin.id) {
      const coinPrice = result?.[coin.id].usd;
      const newCoin = { ...coin, price: coinPrice, transactions: [] };
      setData((current) => [...current, newCoin]);
    }
  };

  const coinDeleteHandle = (deleteCoin: Coin) => {
    setData((current) => {
      const newCoins = current.filter(
        (coin) => coin.symbol !== deleteCoin.symbol
      );
      return newCoins;
    });
  };

  const coinTransactionsHandle = (coin: Coin) => {
    Router.push(`/transactions/${coin.symbol}`);
  };

  const DataContextProviderValue = useMemo(
    () => ({ data, coinAddHandle, coinDeleteHandle, coinTransactionsHandle }),
    [data, coinAddHandle, coinDeleteHandle, coinTransactionsHandle]
  );

  return (
    <DataContext.Provider value={DataContextProviderValue}>
      {children}
    </DataContext.Provider>
  );
};
