import { useState } from 'react';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const tokensAPI = [
  { symbol: 'BNBUSDT', price: '304.50000000' },
  { symbol: 'BTCUSDT', price: '26899.26000000' },
];

const AddTokenForm = ({ onFormSubmit }) => {
  return (
    <form action="/send-data-here" method="post" onSubmit={onFormSubmit}>
      <label>Token:</label>
      <input
        type="text"
        id="token"
        name="token"
        onChange={(e) => {
          e.target.value;
        }}
      />
      <button type="submit">Add Token</button>
    </form>
  );
};

const Token = ({ token, handleDelete }) => {
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
              <Token token={token} handleDelete={onTokenDelete} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const Index = () => {
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
  };

  const tokenDeleteHandle = () => {
    // TODO
  };

  return (
    <Main meta={<Meta title="Portfolio" description="Portfolio" />}>
      <AddTokenForm onFormSubmit={submitHandler} />
      <Portfolio tokens={tokens} onTokenDelete={tokenDeleteHandle} />
    </Main>
  );
};

export default Index;
