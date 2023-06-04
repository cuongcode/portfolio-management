import { useState } from 'react';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

import coinList from '../utils/CoinGeckoCoinsList.json';

const Modal = ({ open, children, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0  bg-black bg-opacity-50">
      <div className="z-1 fixed inset-x-1/2 inset-y-1/4">
        <div className="flex w-96 -translate-x-1/2 -translate-y-1/2 flex-col rounded-lg bg-white p-4">
          <button className="mb-4 text-left" onClick={onClose}>
            X
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

const AddNewToken = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-md bg-green-500 px-4 py-2 text-white "
      >
        Add New Coin
      </button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <form action="" className="flex flex-col">
          <label htmlFor="" className="mb-4 font-bold">
            Seach your favorite coin
          </label>
          <input
            className="mb-4 rounded-md border-2 p-2"
            type="text"
            placeholder="Enter Coin Name"
          />
          <button className="text-left" type="submit" disabled>
            Add
          </button>
        </form>
      </Modal>
    </div>
  );
};

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

const Portfolio = ({ tokens, onTokenDelete }) => {
  return (
    <div className="flex min-h-screen flex-col rounded-md border-2 border-black p-2">
      <div className="mb-10 flex justify-between">
        <div className="flex items-center">
          <h3 className="mr-2 font-bold">My Portfolio</h3>
          {/* add icon here */}
          <div className=" cursor-pointer ">+</div>
        </div>
        {/* <div>
          <div className=" cursor-pointer rounded-md bg-green-500 px-4 py-2 text-white ">
            Add New Coin
          </div>
          <Modal>My Modal</Modal>
        </div> */}
        <AddNewToken />
      </div>

      <div className="mb-10 flex">
        <div className=" mr-6 ">
          <h4>$5000.00</h4>
          <h5>Total Balance</h5>
        </div>
        <div>
          <h4>$1000.00</h4>
          <h5>Total Profit Loss</h5>
        </div>
      </div>

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
            <td className="flex flex-col">
              <button>+</button>
              <button>-</button>
            </td>
          </tr>
        </tbody>
      </table>

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

      // fetch token price from Binance
      // const response = await fetch(
      //   `https://api.binance.com/api/v3/ticker/price?symbol=${token}`,
      //   {
      //     method: 'GET',
      //   }
      // );

      if (response.status === 200) {
        // const newToken = await response.json();

        // // update token list
        // // const newTokens = [
        // //   ...tokens,
        // //   { symbol: newToken.symbol, price: newToken.price },
        // // ];
        // // setTokens(newTokens);

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
          <AddTokenForm onFormSubmit={submitHandler} />
          {/* test styling here */}
          <Portfolio tokens={tokens} onTokenDelete={tokenDeleteHandle} />
        </div>
      </Main>
      <div id="portal" />
    </>
  );
};

export default Index;
