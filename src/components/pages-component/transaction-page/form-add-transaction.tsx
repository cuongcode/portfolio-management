import { useState } from 'react';

export const AddTransactionForm = () => {
  const [transaction, setTransaction] = useState({
    price: null,
    quantity: null,
    date: null,
    fees: null,
    notes: null,
  });

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
            setTransaction({ ...transaction, price: e.target.value });
          }}
        />

        <div>Quantity</div>
        <input
          className={inputStyle}
          type="text"
          placeholder="1"
          onChange={(e) => {
            setTransaction({ ...transaction, quantity: e.target.value });
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
            setTransaction({ ...transaction, date: e.target.value });
          }}
        />

        <div>Fees</div>
        <input
          className={inputStyle}
          type="text"
          placeholder="USD"
          onChange={(e) => {
            setTransaction({ ...transaction, fee: e.target.value });
          }}
        />

        <div>Notes</div>
        <input
          className={inputStyle}
          type="text"
          placeholder="Optional"
          onChange={(e) => {
            setTransaction({ ...transaction, notes: e.target.value });
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
          <button type="button" className="grow rounded-md bg-green-500 p-2">
            Submit
          </button>
        </div>
      </div>
    </>
  );
};
