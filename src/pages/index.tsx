import { useState } from 'react';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const AddTokenForm = ({ onFormSubmit }) => {
  const [token, setToken] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    onFormSubmit(`${token.toUpperCase()}USDT`);
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
<<<<<<< HEAD
  const [tokens, setTokens] = useState([]);

  // handle add token
  const submitHandler = async (token) => {
    try {
      // fetch token price from Binance
      const response = await fetch(
        `https://api.binance.com/api/v3/ticker/price?symbol=${token}`,
        {
          method: 'GET',
        }
      );
      if (response.status === 200) {
        const newToken = await response.json();
        // update token list
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
=======
  const [tokens, setTokens] = useState(tokensAPI);
  // fetch Binance API
  const submitHandler = (e) => {
    e.preventDefault();
    const newTokens = [
      ...tokens,
      { symbol: e.target.token.value, price: '?????' },
    ];
    setTokens(newTokens);
    e.target.token.value = '';
>>>>>>> c8d3bf99bb6f484facac966f3e053f74374cdcf5
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
      <Portfolio tokens={tokens} onTokenDelete={tokenDeleteHandle} />
    </Main>
  );
};

export default Index;
