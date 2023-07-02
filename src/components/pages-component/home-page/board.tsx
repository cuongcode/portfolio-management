import React, { useContext } from 'react';
import { useSelector } from 'react-redux';

import { Card } from '@/components/base';
import { selector } from '@/redux';
import { DataContext } from '@/utils/data-context';

import { AddCoinButton } from './add-coin-button';
import { BoardHeader } from './board-header';
import { CoinTable } from './coin-table';
import { ExportDataButton } from './export-data-button';
import { ImportDataButton } from './import-data-button';

export const Board = () => {
  const { currentData } = useSelector(selector.data);

  const {
    totalBalance,
    totalPNL,
    avgNetCostList,
    holdingsValueList,
    holdingsList,
    PNL_List,
  } = useContext(DataContext);

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

      <CoinTable
        data={currentData}
        avgNetCostList={avgNetCostList}
        holdingsValueList={holdingsValueList}
        holdingsList={holdingsList}
        PNL_List={PNL_List}
      />
    </div>
  );
};
