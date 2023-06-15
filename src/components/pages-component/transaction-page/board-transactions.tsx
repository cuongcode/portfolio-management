import type { Coin } from '@/types/Coin';
import type { Transaction } from '@/types/Transaction';

import { AddTransactionForm, ButtonCenterModal } from '../home-page';
import { TransactionsTable } from './table-transactions';

export const BoardTransactions = ({
  coin,
  holdings,
  transactionAddHandle,
}: {
  coin: Coin;
  holdings: number;
  transactionAddHandle: (coin: Coin, transaction: Transaction) => void;
}) => {
  // const holdings = coin.transactions
  //   .map((item) => item.quantity)
  //   .reduce((sum, i) => sum + i, 0);

  const totalCost = coin.transactions
    .map((item) => item.quantity * item.price)
    .reduce((sum, i) => sum + i, 0);

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
            />
          }
        >
          Add Transaction
        </ButtonCenterModal>
      </div>

      {/* show total cards */}
      <div className="mb-10 flex">
        <div className=" mr-6 p-4 shadow-md">
          <div>$5,000.00</div>
          <div>Holdings Value</div>
        </div>
        <div className=" mr-6 p-4 shadow-md">
          <div>{holdings}</div>
          <div>Holdings</div>
        </div>
        <div className=" mr-6 p-4 shadow-md">
          <div>${totalCost.toFixed(3)}</div>
          <div>Total Cost</div>
        </div>
        <div className=" mr-6 p-4 shadow-md">
          <div>$27,000.00</div>
          <div>Average Net Cost</div>
        </div>
        <div className=" mr-6 p-4 shadow-md">
          <div>$50,00</div>
          <div>Profit / Loss</div>
        </div>
      </div>

      <TransactionsTable transactions={coin.transactions} />
    </div>
  );
};
