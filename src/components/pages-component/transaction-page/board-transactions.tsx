import { AddTransactionForm, ButtonLeftSideModal } from '../home-page';
import { TransactionsTable } from './table-transactions';

export const BoardTransactions = ({ symbol }: { symbol: any }) => {
  return (
    <div className="flex min-h-screen flex-col rounded-md border-[1px] border-gray-400 p-4">
      <div className="mb-10 flex justify-between">
        <div className="flex items-center">
          <h3 className="mr-2 font-bold"> {symbol} Transactions</h3>
          {/* add icon here to modify portfolio eg: rename, delete, ... */}
          <div className=" cursor-pointer ">+</div>
        </div>
        <ButtonLeftSideModal
          tailwindStyle="rounded-md bg-green-500 px-4 py-2 text-white "
          text="Add Transaction"
          modalContent={<AddTransactionForm />}
        />
      </div>

      {/* show total cards */}
      <div className="mb-10 flex">
        <div className=" mr-6 p-4 shadow-md">
          <div>$5,000.00</div>
          <div>Holdings Value</div>
        </div>
        <div className=" mr-6 p-4 shadow-md">
          <div>0.3</div>
          <div>Holdings</div>
        </div>
        <div className=" mr-6 p-4 shadow-md">
          <div>$7,000.00</div>
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

      <TransactionsTable />
    </div>
  );
};
