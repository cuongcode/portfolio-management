import { useState } from 'react';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const AddTransactionForm = () => {
  const inputStyle = 'mb-4 rounded-md border-2 p-2';
  return (
    <>
      <h2 htmlFor="" className="mb-4 text-3xl">
        Add transaction
      </h2>
      <form action="" className="flex flex-col text-base">
        <label htmlFor="">Total Spent</label>
        <input className={inputStyle} type="text" placeholder="USD" />

        <label htmlFor="">Quantity</label>
        <input className={inputStyle} type="text" placeholder="1" />

        <label htmlFor="">Price Per Coin</label>
        <input className={inputStyle} type="text" placeholder="USD" />

        {/* how to create a calender */}
        <label htmlFor="">Date</label>
        <input className={inputStyle} type="text" placeholder="datetime" />

        <label htmlFor="">Fees</label>
        <input className={inputStyle} type="text" placeholder="USD" />

        <label htmlFor="">Notes</label>
        <input className={inputStyle} type="text" placeholder="Optional" />

        <div className="flex justify-between space-x-2">
          <button
            className="grow rounded-md border-2 p-2"
            type="submit"
            disabled
          >
            Cancel
          </button>
          <button className="grow rounded-md bg-green-500 p-2" disabled>
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

const ModalCenter = ({ open, children, onClose }) => {
  if (!open) return null;
  return (
    <>
      <div
        className="fixed inset-0  bg-black bg-opacity-50"
        onClick={onClose}
      />
      <div className="z-1 fixed inset-x-1/2 inset-y-1/4">
        <div className="flex w-96 -translate-x-1/2 -translate-y-1/2 flex-col rounded-lg bg-white p-4">
          <button className="mb-4 text-left" onClick={onClose}>
            X
          </button>
          {children}
        </div>
      </div>
    </>
  );
};

// TODO: take this component out of this file
const ButtonCenterModal = ({ style, text, modalContent }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)} className={style}>
        {text}
      </button>
      <ModalCenter open={isOpen} onClose={() => setIsOpen(false)}>
        {modalContent}
      </ModalCenter>
    </div>
  );
};

const Board = () => {
  return (
    <div className="flex min-h-screen flex-col rounded-md border-[1px] border-gray-400 p-4">
      <div className="mb-10 flex justify-between">
        <div className="flex items-center">
          <h3 className="mr-2 font-bold">Transactions</h3>
          {/* add icon here to modify portfolio eg: rename, delete, ... */}
          <div className=" cursor-pointer ">+</div>
        </div>
        <ButtonCenterModal
          style="rounded-md bg-green-500 px-4 py-2 text-white "
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

      {/* table */}
      <table className="table-fixed text-left">
        <thead>
          <tr className="border-t">
            <th>Type</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Date</th>
            <th>Fees</th>
            <th>Cost</th>
            <th>PNL</th>
            <th>Notes</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t">
            <td>Buy</td>
            <td>27,331.22</td>
            <td>0.1</td>
            <td>datetime</td>
            <td>$0.001</td>
            <td>27,331.22</td>
            <td>+0.786</td>
            <td>{null}</td>
            <td className="flex flex-col items-center">
              <button className="w-fit">+</button>
              <button className="w-fit">+</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const Transaction = () => (
  <Main meta={<Meta title="Transaction" description="Lorem ipsum" />}>
    <div>
      <div>Bitcoin</div>
      <div>BTC</div>
    </div>
    <div>
      <div>27,235.72</div>
      <div>0.1%</div>
    </div>
    <Board />
  </Main>
);

export default Transaction;
