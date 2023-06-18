import { Card } from '@/components/base';
import type { Coin } from '@/types/Coin';
import type { Transaction } from '@/types/Transaction';

import { AddTransactionForm, ButtonCenterModal } from '../home-page';
import { TransactionsTable } from './table-transactions';

export const BoardTransactions = ({
  coin,
  holdings,
  totalCost,
  avgNetCost,
  holdingsValue,
  PNL,
  transactionAddHandle,
}: {
  coin: Coin;
  holdings: number;
  totalCost: number;
  avgNetCost: number;
  holdingsValue: number;
  PNL: number;
  transactionAddHandle: (coin: Coin, transaction: Transaction) => void;
}) => {
  return (
    <div className="flex min-h-screen flex-col rounded-md border-[1px] border-gray-400 p-4">
      <div className="mb-10 flex justify-between">
        <div className="flex items-center">
          <h3 className="mr-2 font-bold">
            {coin.symbol.toUpperCase()} Transactions
          </h3>
          {/* add icon here to modify portfolio eg: rename, delete, ... */}
          <div className=" cursor-pointer ">+</div>
        </div>
        <ButtonCenterModal
          tailwindStyle="rounded-md bg-green-500 px-4 py-2 text-white "
          modalContent={
            <AddTransactionForm
              transactionAdd={transactionAddHandle}
              coin={coin}
              holdings={holdings}
              avgNetCost={avgNetCost}
            />
          }
        >
          Add Transaction
        </ButtonCenterModal>
      </div>

      {/* show total cards */}
      <div className="mb-10 flex">
        <Card title="Holdings Value" number={holdingsValue} showColor={false} />
        <Card title="Holdings" number={holdings} showColor={false} />
        <Card title="Total Cost" number={totalCost} showColor={false} />
        <Card title="Average Net Cost" number={avgNetCost} showColor={false} />
        <Card title="Profit / Loss " number={PNL} showColor />
      </div>

      <TransactionsTable
        transactions={coin.transactions}
        avgNetCost={avgNetCost}
      />
    </div>
  );
};
