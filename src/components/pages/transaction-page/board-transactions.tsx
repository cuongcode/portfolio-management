import { ChevronRightIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Card } from '@/components/base';
import { DataActions, selector } from '@/redux';
import {
  selectAvgNetCostList,
  selectHoldingsList,
  selectHoldingsValueList,
  selectPNL_List,
  selectTotalCostList,
} from '@/redux/Data/DataRedux';

import { AddTransactionForm, ButtonCenterModal } from '../home-page';
import { TransactionsTable } from './transaction-table';

export const BoardTransactions = ({ symbol }: { symbol: any }) => {
  const { currentData } = useSelector(selector.data);
  const { currentUser } = useSelector(selector.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      dispatch(DataActions.setCurrentData(currentUser.data));
    }
  }, []);

  const avgNetCostList = selectAvgNetCostList(currentData);
  const holdingsValueList = selectHoldingsValueList(currentData);
  const holdingsList = selectHoldingsList(currentData);
  const PNL_List = selectPNL_List(currentData);
  const totalCostList = selectTotalCostList(currentData);

  const index = currentData.findIndex((item: any) => item.symbol === symbol);

  const coin = currentData[index];
  const holdings = holdingsList[index];
  const totalCost = totalCostList[index];
  const avgNetCost = avgNetCostList[index];
  const holdingsValue = holdingsValueList[index];
  const PNL = PNL_List[index];

  return (
    <div className="flex min-h-screen flex-col rounded-md border-[1px] border-gray-400 p-4">
      <div className="mb-5 flex">
        <Link href="/" className="font-bold text-green-500">
          My Portfolio
        </Link>
        <ChevronRightIcon className="w-4 text-green-500" />
        <div>{coin?.name} Transaction Overview</div>
      </div>
      <div className="flex items-baseline">
        <div className="mr-2 text-lg font-bold">{coin?.name}</div>
        <div>{coin?.symbol.toUpperCase()}</div>
      </div>
      <div className="mb-5 text-xl font-bold">${coin?.price}</div>
      <div className="mb-10 flex">
        <Card title="Holdings Value" number={holdingsValue} showColor={false} />
        <Card title="Holdings" number={holdings} showColor={false} />
        <Card title="Total Cost" number={totalCost} showColor={false} />
        <Card title="Average Net Cost" number={avgNetCost} showColor={false} />
        <Card title="Profit / Loss " number={PNL} showColor />
      </div>

      <div className="mb-5 flex items-center justify-between">
        <div className="mb-5 text-lg font-bold">Transactions</div>
        <ButtonCenterModal
          className="rounded-md bg-green-500 px-4 py-2 text-white "
          modalContent={
            <AddTransactionForm
              coin={coin}
              holdings={holdings}
              avgNetCost={avgNetCost}
            />
          }
        >
          Add Transaction
        </ButtonCenterModal>
      </div>

      <TransactionsTable
        transactions={coin?.transactions}
        avgNetCost={avgNetCost}
        coin={coin}
        holdings={holdings}
      />
    </div>
  );
};
