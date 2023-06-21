import dayjs from 'dayjs';
import Router from 'next/router';
import type { ReactNode } from 'react';
import React, { createContext, useEffect, useState } from 'react';
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
  const [userInfo, setUserInfo] = useState<any>({});
  const [allUsers, setAllUsers] = useState<any[]>([]);

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
      item?.transactions.map((trans: any) => {
        if (trans.buy) {
          return trans.price * trans.quantity;
        }
        return trans.avgNetCost * trans.quantity;
      })
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

  const saveDataToUser = () => {
    const newAllUsers = [...allUsers];
    const findIdx = newAllUsers.findIndex((user) => user.id === userInfo.id);
    newAllUsers[findIdx].data = data;
    setAllUsers(newAllUsers);
  };

  const onLogin = (form: any) => {
    const findUser = allUsers.find(
      (user) =>
        user.password === form.password && user.username === form.username
    );
    if (!findUser) {
      toast.error('User not found');
      return;
    }
    const { data: userData, ...rest } = findUser;
    setUserInfo(rest);
    setData(userData);
  };

  const onRegister = (form: any) => {
    const newAllUsers = [
      ...allUsers,
      {
        id: dayjs().toString(),
        username: form.username,
        password: form.password,
        data: [],
      },
    ];
    setAllUsers(newAllUsers);
    setTimeout(() => {
      onLogin(form);
    }, 300);
  };

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
    setData((current: any) => {
      return current.map((item: any) => {
        if (item.id === updatedCoin.id) {
          return updatedCoin;
        }
        return item;
      });
    });
  };
  const transactionDeleteHandle = (coin: Coin, transaction: Transaction) => {
    const updatedTransactions = [...coin.transactions];
    const deleteIndex = updatedTransactions.findIndex(
      (item) => item.id === transaction.id
    );
    updatedTransactions.splice(deleteIndex, 1);
    const updatedCoin = { ...coin, transactions: updatedTransactions };
    setData((current: any) => {
      return current.map((item: any) => {
        if (item.id === updatedCoin.id) {
          return updatedCoin;
        }
        return item;
      });
    });
  };

  const onImportData = (text: string) => {
    const importData = JSON.parse(text);
    setData(importData);
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const DataContextProviderValue = {
    data,
    holdingsList,
    totalCostList,
    avgNetCostList,
    holdingsValueList,
    PNL_List,
    totalBalance,
    totalPNL,
    userInfo,
    coinAddHandle,
    coinDeleteHandle,
    coinTransactionsHandle,
    transactionAddHandle,
    transactionDeleteHandle,
    onImportData,
    onRegister,
    saveDataToUser,
    onLogin,
  };

  return (
    // @ts-ignore
    <DataContext.Provider value={DataContextProviderValue}>
      {children}
    </DataContext.Provider>
  );
};
