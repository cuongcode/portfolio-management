import dayjs from 'dayjs';
import Router from 'next/router';
import type { ReactNode } from 'react';
import React, { createContext, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

import { ApiInstance } from '@/services/api';
import { handleError } from '@/services/apiHelper';
import type { Coin } from '@/types/Coin';
import type { Transaction } from '@/types/Transaction';

import { sumOfNumberArray, zip } from './base';
import { staticData } from './static-data';

interface DataContextProps {
  // data: any;
  // setData: React.Dispatch<React.SetStateAction<any>>;

  data: any;
  holdingsList: any[];
  totalCostList: any;
  avgNetCostList: any;
  holdingsValueList: any;
  PNL_List: any;
  totalBalance: any;
  totalPNL: any;
  userInfo: any;
  coinAddHandle: any;
  coinDeleteHandle: any;
  onOpenTransactions: any;
  transactionAddHandle: any;
  transactionDeleteHandle: any;
  transactionEditHandle: any;
  onImportData: any;
  onRegister: any;
  saveDataToUser: any;
  onLogin: any;
}

const DataContext = createContext({} as DataContextProps);

const DataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<any>(staticData);
  const [userInfo, setUserInfo] = useState<any>({});
  const [allUsers, setAllUsers] = useState<any[]>([]);

  const currentPriceList = data.map((item: any) => item.price);

  const holdingsList = data.map((item: any) => {
    if (item?.transactions.length === 0) {
      return 0;
    }
    return sumOfNumberArray(
      item?.transactions.map((trans: any) => trans.quantity)
    );
  });

  const totalCostList = data.map((item: any) => {
    if (item?.transactions.length === 0) {
      return 0;
    }
    return sumOfNumberArray(
      item?.transactions.map((trans: any) => {
        if (trans.buy) {
          return trans.price * trans.quantity;
        }
        return trans.avgNetCost * trans.quantity;
      })
    );
  });

  const avgNetCostList = zip(totalCostList, holdingsList, (a, b) => a / b);

  const holdingsValueList = zip(
    currentPriceList,
    holdingsList,
    (a, b) => a * b
  );

  const PNL_List = zip(holdingsValueList, totalCostList, (a, b) => a - b);

  const totalBalance = sumOfNumberArray(totalCostList);

  const totalPNL = sumOfNumberArray(PNL_List);

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

  const onLogin = (form: any, successCB?: () => void) => {
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
    if (successCB) successCB();
  };

  const onRegister = (form: any, successCB?: () => void) => {
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
    if (successCB) successCB();
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

  const onOpenTransactions = (coin: Coin) => {
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
  const transactionEditHandle = (coin: Coin, transaction: Transaction) => {
    const updatedTransactions = coin.transactions.map((item) => {
      if (transaction.id === item.id) {
        return transaction;
      }
      return item;
    });
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

  const value = useMemo<DataContextProps>(
    () => ({
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
      onOpenTransactions,
      transactionAddHandle,
      transactionDeleteHandle,
      transactionEditHandle,
      onImportData,
      onRegister,
      saveDataToUser,
      onLogin,
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
      userInfo,
      coinAddHandle,
      coinDeleteHandle,
      onOpenTransactions,
      transactionAddHandle,
      transactionDeleteHandle,
      transactionEditHandle,
      onImportData,
      onRegister,
      saveDataToUser,
      onLogin,
    ]
  );
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export { DataContext, DataProvider };
