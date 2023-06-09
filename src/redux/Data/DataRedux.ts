import type { AnyAction } from 'redux';
import type { DefaultActionCreators, DefaultActionTypes } from 'reduxsauce';
import { createActions, createReducer } from 'reduxsauce';
import { createSelector } from 'reselect';
import * as Immutable from 'seamless-immutable';

import type { Coin } from '@/types/Coin';
import type { Transaction } from '@/types/Transaction';
import { sumOfNumberArray, zipArray } from '@/utils/base';

/* ------------- Model interface Create Action ------------- */
interface DataAction extends AnyAction {}

interface IActionTypes extends DefaultActionTypes {
  SET_CURRENT_DATA: 'setCurrentData';
}

interface IActionCreators extends DefaultActionCreators {
  setCurrentData: (data: Coin[]) => AnyAction;
}

type IActions = DataAction | AnyAction;

export interface DataState {
  currentData: Coin[];
}

type ImmutableMyType = Immutable.ImmutableObject<DataState>;

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions<IActionTypes, IActionCreators>({
  setCurrentData: ['data'],
});

export const DataTypes = Types;
export default Creators;

const INITIAL_STATE: ImmutableMyType = Immutable.from({
  currentData: <Coin[]>[],
});

const setCurrentData = (state: ImmutableMyType, { data }: { data: Coin[] }) =>
  state.merge({ currentData: data });

export const reducer = createReducer<ImmutableMyType, IActions>(INITIAL_STATE, {
  [Types.SET_CURRENT_DATA]: setCurrentData,
});

/* ------------- Selector ------------- */
const dataState = (state: Coin[]) => state;

export const selectCurrentPriceList = createSelector(dataState, (currentData) =>
  currentData.map((item: Coin) => item.price)
);

export const selectHoldingsList = createSelector(dataState, (currentData) =>
  currentData.map((item: Coin) => {
    if (item.transactions.length === 0) {
      return 0;
    }
    return sumOfNumberArray(
      item.transactions.map((trans: Transaction) => trans.quantity)
    );
  })
);

export const selectTotalCostList = createSelector(dataState, (currentData) =>
  currentData.map((item: Coin) => {
    if (item.transactions.length === 0) {
      return 0;
    }
    return sumOfNumberArray(
      item.transactions.map((trans: Transaction) => {
        if (trans.buy) {
          return trans.price * trans.quantity;
        }
        return trans.avgNetCost * trans.quantity;
      })
    );
  })
);

export const selectAvgNetCostList = createSelector(
  selectTotalCostList,
  selectHoldingsList,
  (totalCostList, holdingsList) =>
    zipArray(totalCostList, holdingsList, (a, b) => a / b)
);

export const selectHoldingsValueList = createSelector(
  selectCurrentPriceList,
  selectHoldingsList,
  (currentPriceList, holdingsList) =>
    zipArray(currentPriceList, holdingsList, (a, b) => a * b)
);

// to be changed formular
export const selectPNL_List = createSelector(
  selectHoldingsValueList,
  selectTotalCostList,
  (holdingsValueList, totalCostList) =>
    zipArray(holdingsValueList, totalCostList, (a, b) => a - b)
);

export const selectTotalBalance = createSelector(
  selectHoldingsValueList,
  (holdingsValueList) => sumOfNumberArray(holdingsValueList)
);

export const selectTotalPNL = createSelector(selectPNL_List, (PNL_List) =>
  sumOfNumberArray(PNL_List)
);
