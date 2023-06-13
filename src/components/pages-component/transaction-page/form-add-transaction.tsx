import { useState } from 'react';

import type { Coin } from '@/types/Coin';
import type { Transaction } from '@/types/Transaction';

const emptyTransaction = {
  id: '',
  price: '',
  quantity: '',
  date: '',
  fees: '',
  notes: '',
};

export const AddTransactionForm = ({
  transactionAdd,
  coin,
}: {
  transactionAdd: (coin: Coin, transaction: Transaction) => void;
  coin: Coin;
}) => {
  const [transaction, setTransaction] = useState<any>({});

  const isValid = transaction.price && transaction.quantity;

  const _transactionAdd = () => {
    setTransaction((current) => ({
      ...current,
      id: coin.transactions.length + 1,
    }));
    transactionAdd(coin, transaction);
    setTransaction({});
  };

  const inputStyle = 'mb-4 rounded-md border-2 p-2';
  return (
    <>
      <h2 className="mb-4 text-3xl">Add transaction</h2>
      <div className="flex flex-col text-base">
        <div>Price Per Coin</div>
        <input
          className={inputStyle}
          type="number"
          placeholder="USD"
          value={transaction.price}
          onChange={(e) => {
            setTransaction((current) => ({
              ...current,
              price: Number(e.target.value),
            }));
          }}
        />

        <div>Quantity</div>
        <input
          className={inputStyle}
          type="number"
          placeholder="1"
          value={transaction.quantity}
          onChange={(e) => {
            setTransaction((current) => ({
              ...current,
              quantity: Number(e.target.value),
            }));
          }}
        />

        <div>Total Spent</div>
        <input className={inputStyle} type="text" placeholder="USD" />

        {/* how to create a calender */}
        <div>Date</div>
        <input
          className={inputStyle}
          type="datetime-local"
          onChange={(e) => {
            setTransaction((current) => ({
              ...current,
              date: e.target.value,
            }));
          }}
        />

        <div>Fees (Optional)</div>
        <input
          className={inputStyle}
          type="number"
          placeholder="USD"
          onChange={(e) => {
            setTransaction((current) => ({
              ...current,
              fees: Number(e.target.value),
            }));
          }}
        />

        <div>Notes (Optional)</div>
        <input
          className={inputStyle}
          type="text"
          placeholder="Optional"
          value={transaction.notes}
          onChange={(e) => {
            setTransaction((current) => ({
              ...current,
              notes: e.target.value,
            }));
          }}
        />

        <div className="flex justify-between space-x-2">
          <button
            className="grow rounded-md border-2 p-2"
            type="submit"
            disabled
          >
            Cancel
          </button>
          <button
            onClick={_transactionAdd}
            type="submit"
            className="grow rounded-md bg-green-500 p-2"
            disabled={!isValid}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};
