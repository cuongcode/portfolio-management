import React, { useContext } from 'react';

import { Card } from '@/components/base';
import { DataContext } from '@/utils/data-context';

import { AddCoinButton } from './add-coin-button';
import { BoardHeader } from './board-header';
import { CoinTable } from './coin-table';
import { ExportDataButton } from './export-data-button';
import { ImportDataButton } from './import-data-button';

export const Board = () => {
  const {
    data,
    totalBalance,
    totalPNL,
    coinAddHandle,
    coinDeleteHandle,
    onOpenTransactions,
    onImportData,
  } = useContext(DataContext);

  return (
    <div className="flex min-h-screen flex-col rounded-md border-[1px] border-gray-400 p-4">
      <div className="mb-10 flex justify-between">
        <BoardHeader />
      </div>

      <div className="mb-10 flex justify-between">
        <div className="flex">
          <Card title="Total Balance" number={totalBalance} showColor={false} />
          <Card title="Total Profit Loss" number={totalPNL} showColor />
        </div>

        <div className="flex space-x-2">
          <ImportDataButton onImportData={onImportData} />
          <ExportDataButton data={data} />
        </div>
        <AddCoinButton onAddCoin={coinAddHandle} />
      </div>

      <CoinTable
        coins={data}
        coinDelete={coinDeleteHandle}
        onOpenTransactions={onOpenTransactions}
      />
    </div>
  );
};
