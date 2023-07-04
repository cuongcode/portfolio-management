import type { ReactNode } from 'react';
import React, { createContext, useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

import { DataActions, selector } from '@/redux';
import { selectCurrentPriceList } from '@/redux/Data/DataRedux';
import { ApiInstance } from '@/services/api';
import { handleError } from '@/services/apiHelper';

import { sumOfNumberArray, zipArray } from '../src/utils/base';

interface DataContextProps {
  // data: any;
  // setData: React.Dispatch<React.SetStateAction<any>>;

  holdingsList: any[];
  totalCostList: any;
  avgNetCostList: any;
  holdingsValueList: any;
  PNL_List: any;
  totalBalance: any;
  totalPNL: any;
}

const DataContext = createContext({} as DataContextProps);

const DataProvider = ({ children }: { children: ReactNode }) => {
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
        dispatch(DataActions.setCurrentData(updatedCurrentData));
      }
    });
  }, []);

  // useMemo should use
  const currentPriceList = selectCurrentPriceList(currentData);

  // const currentPriceList = currentData.map((item: any) => item.price);

  const holdingsList = currentData.map((item: any) => {
    if (item?.transactions.length === 0) {
      return 0;
    }
    return sumOfNumberArray(
      item?.transactions.map((trans: any) => trans.quantity)
    );
  });

  const totalCostList = currentData.map((item: any) => {
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

  const avgNetCostList = zipArray(totalCostList, holdingsList, (a, b) => a / b);

  const holdingsValueList = zipArray(
    currentPriceList,
    holdingsList,
    (a, b) => a * b
  );

  const PNL_List = zipArray(holdingsValueList, totalCostList, (a, b) => a - b);

  const totalBalance = sumOfNumberArray(holdingsValueList);

  const totalPNL = sumOfNumberArray(PNL_List);

  const value = useMemo<DataContextProps>(
    () => ({
      holdingsList,
      totalCostList,
      avgNetCostList,
      holdingsValueList,
      PNL_List,
      totalBalance,
      totalPNL,
    }),
    [
      holdingsList,
      totalCostList,
      avgNetCostList,
      holdingsValueList,
      PNL_List,
      totalBalance,
      totalPNL,
    ]
  );
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export { DataContext, DataProvider };
