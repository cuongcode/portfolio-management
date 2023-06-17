import Router from 'next/router';
import type { ReactNode } from 'react';
import React, { createContext, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

import { ApiInstance } from '@/services/api';
import { handleError } from '@/services/apiHelper';
import type { Coin } from '@/types/Coin';
import type { Transaction } from '@/types/Transaction';

import { _sum, _zip } from './base';
import { staticData } from './static-data';

export const DataContext = createContext<Coin[]>([]);

export const DataContextProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<any>(staticData);

  const currentPriceList = data.map((item: any) => item.price);

  const holdingsList = data.map((item: any) => {
    if (item?.transactions.length === 0) {
      return 0;
    }
    return _sum(item?.transactions.map((trans: any) => trans.quantity));
  });

  const totalCostList = data.map((item: any) => {
    if (item?.transactions.length === 0) {
      return 0;
    }
    return _sum(
      item?.transactions.map((trans: any) => trans.price * trans.quantity)
    );
  });

  const avgNetCostList = _zip(totalCostList, holdingsList, (a, b) => a / b);

  const holdingsValueList = _zip(
    currentPriceList,
    holdingsList,
    (a, b) => a * b
  );

  const PNL_List = _zip(holdingsValueList, totalCostList, (a, b) => a - b);

  const totalBalance = _sum(totalCostList);

  const totalPNL = _sum(PNL_List);

  useEffect(() => {
    data.map(async (item: any) => {
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
        setData((current: any) =>
          current.map((coin: any) => {
            if (coin?.id === updateCoin?.id) {
              return updateCoin;
            }
            return coin;
          })
        );
      }
    });
  }, []);

  const coinAddHandle = async (coin: Coin) => {
    const body = {
      ids: coin?.id,
      vs_currencies: 'usd',
      precision: '3',
    };
    const res = await ApiInstance.getTokenPrice(body);
    const { result, error } = handleError(res);
    if (error) {
      toast.error('Something wrong in fetch coin');
      return;
    }
    if (coin?.id) {
      const coinPrice = result?.[coin.id].usd;
      const newCoin = { ...coin, price: coinPrice, transactions: [] };
      setData((current: any) => [...current, newCoin]);
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

  const transactionAddHandle = (coin: Coin, transaction: Transaction) => {
    const updatedTransactions = [...coin.transactions, transaction];
    const updatedCoin = { ...coin, transactions: updatedTransactions };
    setData((current) => {
      return current.map((item) => {
        if (item.id === updatedCoin.id) {
          return updatedCoin;
        }
        return item;
      });
    });
  };

  const DataContextProviderValue = useMemo(
    () => ({
      data,
      holdingsList,
      totalCostList,
      avgNetCostList,
      holdingsValueList,
      PNL_List,
      totalBalance,
      totalPNL,
      coinAddHandle,
      coinDeleteHandle,
      coinTransactionsHandle,
      transactionAddHandle,
    }),
    [
      data,
      holdingsList,
      totalCostList,
      avgNetCostList,
      holdingsValueList,
      PNL_List,
      totalBalance,
      totalPNL,
      coinAddHandle,
      coinDeleteHandle,
      coinTransactionsHandle,
    ]
  );

  return (
    <DataContext.Provider value={DataContextProviderValue}>
      {children}
    </DataContext.Provider>
  );
};
