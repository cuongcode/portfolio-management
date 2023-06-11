import { useState } from 'react';

import type { Coin } from '@/types/Coin';
import type { Transaction } from '@/types/Transaction';

const emptyTransaction = {
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
  const [transaction, setTransaction] = useState<Transaction>(emptyTransaction);

  const isValid = transaction.price && transaction.quantity;

  const _transactionAdd = () => {
    transactionAdd(coin, transaction);
    setTransaction(emptyTransaction);
  };

  const inputStyle = 'mb-4 rounded-md border-2 p-2';
  return (
    <>
      <h2 className="mb-4 text-3xl">Add transaction</h2>
      <div className="flex flex-col text-base">
        <div>Price Per Coin</div>
        <input
          className={inputStyle}
          type="text"
          placeholder="USD"
          onChange={(e) => {
            setTransaction((current) => ({
              ...current,
              price: e.target.value,
            }));
          }}
        />

        <div>Quantity</div>
        <input
          className={inputStyle}
          type="text"
          placeholder="1"
          onChange={(e) => {
            setTransaction((current) => ({
              ...current,
              quantity: e.target.value,
            }));
          }}
        />

        <div>Total Spent</div>
        <input className={inputStyle} type="text" placeholder="USD" />

        {/* how to create a calender */}
        <div>Date</div>
        <input
          className={inputStyle}
          type="text"
          placeholder="datetime"
          onChange={(e) => {
            setTransaction((current) => ({
              ...current,
              date: e.target.value,
            }));
          }}
        />

        <div>Fees</div>
        <input
          className={inputStyle}
          type="text"
          placeholder="USD"
          onChange={(e) => {
            setTransaction((current) => ({
              ...current,
              fees: e.target.value,
            }));
          }}
        />

        <div>Notes</div>
        <input
          className={inputStyle}
          type="text"
          placeholder="Optional"
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
