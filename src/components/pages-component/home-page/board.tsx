import { useContext } from 'react';

import { DataContext } from '@/utils/data-context';

import { ButtonCenterModal } from './button-center-modal';
import { AddNewCoinForm } from './form-add-new-coin';
import Header from './header';
import { CoinsTable } from './table-coins';

export const Board = () => {
  const { data, coinAddHandle, coinDeleteHandle, coinTransactionsHandle } =
    useContext(DataContext);

  return (
    <div className="flex min-h-screen flex-col rounded-md border-[1px] border-gray-400 p-4">
      <Header />

      {/* show total cards */}
      <div className="mb-10 flex justify-between">
        <div className="flex">
          <div className=" mr-6 p-4 shadow-md">
            <div>$5000.00</div>
            <div>Total Balance</div>
          </div>
          <div className=" mr-6 p-4 shadow-md">
            <div>$1000.00</div>
            <div>Total Profit Loss</div>
          </div>
        </div>
        <ButtonCenterModal
          tailwindStyle="
            rounded-md
            bg-green-500
            px-4 py-2
            text-white
            transition
            delay-150
            hover:scale-110
            duration-300
            hover:-translate-y-1"
          modalContent={<AddNewCoinForm onFormSubmit={coinAddHandle} />}
        >
          Add New Coin
        </ButtonCenterModal>
      </div>

      <CoinsTable
        coins={data}
        coinDelete={coinDeleteHandle}
        coinTransactions={coinTransactionsHandle}
      />
    </div>
  );
};
