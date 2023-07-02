import { ChevronRightIcon } from '@heroicons/react/outline';
import Link from 'next/link';

import { Card } from '@/components/base';
import type { Coin } from '@/types/Coin';

import { AddTransactionForm, ButtonCenterModal } from '../home-page';
import { TransactionsTable } from './table-transactions';

export const BoardTransactions = ({
  coin,
  holdings,
  totalCost,
  avgNetCost,
  holdingsValue,
  PNL,
}: {
  coin: Coin;
  holdings: number;
  totalCost: number;
  avgNetCost: number;
  holdingsValue: number;
  PNL: number;
}) => {
  return (
    <div className="flex min-h-screen flex-col rounded-md border-[1px] border-gray-400 p-4">
      <div className="mb-5 flex">
        <Link href="/" className="font-bold text-green-500">
          My Portfolio
        </Link>
        <ChevronRightIcon className="w-4 text-green-500" />
        <div>{coin.name} Transaction Overview</div>
      </div>
      <div className="flex items-baseline">
        <div className="mr-2 text-lg font-bold">{coin.name}</div>
        <div>{coin.symbol.toUpperCase()}</div>
      </div>
      <div className="mb-5 text-xl font-bold">${coin.price}</div>
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
        transactions={coin.transactions}
        avgNetCost={avgNetCost}
        coin={coin}
        holdings={holdings}
      />
    </div>
  );
};
