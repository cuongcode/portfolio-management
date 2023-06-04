import { useState } from 'react';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

import coinList from '../utils/CoinGeckoCoinsList.json';

// TODO: take this component out of this file
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
const ModalLeftSide = ({ open, children, onClose }) => {
  if (!open) return null;
  return (
    <>
      <div
        className="fixed inset-0  bg-black bg-opacity-50"
        onClick={onClose}
      />
      <div className="z-1 fixed left-0 top-0">
        <div className="flex w-[50vw] flex-col bg-white p-4">
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

// TODO: take this component out of this file
const ButtonLeftSideModal = ({ style, text, modalContent }) => {
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

// TODO: take this component out of this file
const AddNewCoinForm = () => {
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

// TODO: take this component out of this file
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

// TODO: test fetch function purpose, no use in future
function AddTokenForm({ onFormSubmit }) {
  const [token, setToken] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    // onFormSubmit(`${token.toUpperCase()}USDT`);
    onFormSubmit(token);
    setToken('');
  };

  return (
    <form action="/send-data-here" method="post" onSubmit={submitHandler}>
      <label>Token:</label>
      <input
        type="text"
        id="token"
        name="token"
        placeholder="Input token here"
        value={token}
        onChange={(e) => {
          setToken(e.target.value);
        }}
      />
      <button type="submit" disabled={!token}>
        Add Token
      </button>
    </form>
  );
}

// TODO: take this component out of this file
function Token({ token, tokenDelete }) {
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

const Board = ({ tokens, onTokenDelete }) => {
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

const Index = () => {
  const [tokens, setTokens] = useState([]);

  // handle add token
  const submitHandler = async (symbol) => {
    try {
      // https://pro-api.coingecko.com/api/v3/

      // get token id from token symbol, use coinList json fetch from Coingecko
      const coin = coinList.filter((coin) => coin.symbol === symbol)[0];

      const params = new URLSearchParams({
        ids: coin.id,
        vs_currencies: 'usd',
        precision: '3',
      });

      // fetch token price from Coingecko
      // https://api.coingecko.com/api/v3/simple/price?
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?${params}`
      );

      if (response.status === 200) {
        const data = await response.json();
        const coinPrice = data[coin.id].usd;
        const newToken = {
          symbol: coin?.symbol,
          name: coin?.name,
          price: coinPrice,
        };
        const newTokens = [
          ...tokens,
          { symbol: newToken.symbol, price: newToken.price },
        ];

        setTokens(newTokens);
      } else {
        console.log('Something wrong in fetch token');
      }
    } catch (error) {
      console.log(error);
      alert('Please input a valid token');
    }
  };

  // handle delete token
  const tokenDeleteHandle = (deleteToken) => {
    const newTokens = tokens.filter(
      (token) => token.symbol !== deleteToken.symbol
    );
    setTokens(newTokens);
  };

  return (
    <>
      <Main meta={<Meta title="Portfolio" description="Portfolio" />}>
        <div className="px-5">
          {/* test fetch */}
          {/* <AddTokenForm onFormSubmit={submitHandler} /> */}
          <Board tokens={tokens} onTokenDelete={tokenDeleteHandle} />
        </div>
      </Main>
      <div id="portal" />
    </>
  );
};

export default Index;
