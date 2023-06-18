import React, { useContext, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { Card } from '@/components/base';
import { DataContext } from '@/utils/data-context';

import { ButtonCenterModal } from './button-center-modal';
import { AddNewCoinForm } from './form-add-new-coin';
import Header from './header';
import { CoinsTable } from './table-coins';

export const Board = () => {
  const {
    data,
    totalBalance,
    totalPNL,
    coinAddHandle,
    coinDeleteHandle,
    coinTransactionsHandle,
  } = useContext(DataContext);

  return (
    <div className="flex min-h-screen flex-col rounded-md border-[1px] border-gray-400 p-4">
      <Header />

      <div className="mb-10 flex justify-between">
        <div className="flex">
          <Card title="Total Balance" number={totalBalance} showColor={false} />
          <Card title="Total Profit Loss" number={totalPNL} showColor />
        </div>

        <div className="flex space-x-2">
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
            modalContent={<div>emty</div>}
          >
            Import Data
          </ButtonCenterModal>

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
            modalContent={<ExportForm data={data} />}
          >
            Export Data
          </ButtonCenterModal>
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

const ExportForm = ({ data }: { data: any[] }) => {
  const [text, setText] = useState('Copy to Clipboard');
  const _onCopy = () => {
    setText('Copied');
  };

  return (
    <div className="flex flex-col">
      <CopyToClipboard text={JSON.stringify(data)} onCopy={_onCopy}>
        <button
          type="button"
          className="rounded-md
            bg-green-500
            px-4 py-2
            text-white
          "
        >
          {text}
        </button>
      </CopyToClipboard>

      <div className="">{JSON.stringify(data)}</div>
    </div>
  );
};
