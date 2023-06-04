import { useState } from 'react';

import { AddTokenForm, Board } from '@/components/pages-component/home-page';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import coinList from '@/utils/CoinGeckoCoinsList.json';

const HomePage = () => {
  const [tokens, setTokens] = useState([]);

  const onAddToken = async (symbol: string) => {
    try {
      // https://pro-api.coingecko.com/api/v3/

      // get token id from token symbol, use coinList json fetch from Coingecko
      const coin = coinList.find((item) => item.symbol === symbol);

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
          <AddTokenForm onFormSubmit={onAddToken} />
          <Board tokens={tokens} onTokenDelete={tokenDeleteHandle} />
        </div>
      </Main>
      <div id="portal" />
    </>
  );
};

export default HomePage;
