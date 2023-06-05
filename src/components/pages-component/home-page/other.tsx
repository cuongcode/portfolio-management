import { useState } from 'react';

import { ModalCenter } from './modal-center';
import { ModalLeftSide } from './modal-left-side';

export const ButtonCenterModal = ({ style, text, modalContent }) => {
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

export const ButtonLeftSideModal = ({ style, text, modalContent }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)} className={style}>
        {text}
      </button>
      <ModalLeftSide open={isOpen} onClose={() => setIsOpen(false)}>
        {modalContent}
      </ModalLeftSide>
    </div>
  );
};

export const AddNewCoinForm = () => {
  return (
    <>
      <h2 htmlFor="" className="mb-4 font-bold">
        Seach your favorite coin
      </h2>
      <form action="" className="flex flex-col">
        <input
          className="mb-4 rounded-md border-2 p-2"
          type="text"
          placeholder="Enter Coin Name"
        />
        {/* List of coins as buttons to choose show here */}
        <button className="text-left" type="submit" disabled>
          BTC
        </button>
        <button className="text-left" type="submit" disabled>
          ETH
        </button>
      </form>
    </>
  );
};

export const AddTransactionForm = () => {
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

// TODO: take this component out of this file
export function Token({ token, tokenDelete }) {
  const handleDelete = () => {
    tokenDelete(token);
  };

  return (
    <div>
      {token.symbol}: {token.price}|
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export const Board = ({ tokens, onTokenDelete }) => {
  return (
    <div className="flex min-h-screen flex-col rounded-md border-[1px] border-gray-400 p-4">
      <div className="mb-10 flex justify-between">
        <div className="flex items-center">
          <h3 className="mr-2 font-bold">My Portfolio</h3>
          {/* add icon here to modify portfolio eg: rename, delete, ... */}
          <div className=" cursor-pointer ">+</div>
        </div>
        <ButtonCenterModal
          style="rounded-md bg-green-500 px-4 py-2 text-white "
          text="Add New Coin"
          modalContent={<AddNewCoinForm />}
        />
      </div>

      {/* show total cards */}
      <div className="mb-10 flex">
        <div className=" mr-6 p-4 shadow-md">
          <div>$5000.00</div>
          <div>Total Balance</div>
        </div>
        <div className=" mr-6 p-4 shadow-md">
          <div>$1000.00</div>
          <div>Total Profit Loss</div>
        </div>
      </div>

      {/* table */}
      <table className="table-fixed text-left">
        <thead>
          <tr className="border-t">
            <th>#</th>
            <th>Coin</th>
            <th>Price</th>
            <th>Avg Price</th>
            <th>Holdings</th>
            <th>PNL</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t">
            <td>1</td>
            <td>Bitcoin</td>
            <td>27,331.22</td>
            <td>24,120.81</td>
            <td>$1000 (10%) 0.1BTC</td>
            <td>$20.00 4%</td>
            <td className="flex flex-col items-center">
              {/* <button>+</button> */}
              <ButtonLeftSideModal
                text="+"
                modalContent={<AddTransactionForm />}
              />
              <button className="w-fit">+</button>
            </td>
          </tr>
        </tbody>
      </table>

      {/* testing */}
      <ul>
        {tokens.map((token) => {
          return (
            <li key={token.symbol}>
              <Token token={token} tokenDelete={onTokenDelete} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
