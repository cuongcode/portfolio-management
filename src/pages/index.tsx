import { useState } from 'react';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

import coinList from '../utils/CoinGeckoCoinsList.json';

const AddTokenForm = ({ onFormSubmit }) => {
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
};

const Token = ({ token, tokenDelete }) => {
  const handleDelete = () => {
    tokenDelete(token);
  };

  return (
    <div>
      {token.symbol}: {token.price}|
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

const Portfolio = ({ tokens, onTokenDelete }) => {
  return (
    <div>
      <h3>My Portfolio</h3>
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
    <Main meta={<Meta title="Portfolio" description="Portfolio" />}>
      <AddTokenForm onFormSubmit={submitHandler} />
      {/* test styling here */}
      <Portfolio
        className="bg-green-500"
        tokens={tokens}
        onTokenDelete={tokenDeleteHandle}
      />
    </Main>
  );
};

export default Index;
