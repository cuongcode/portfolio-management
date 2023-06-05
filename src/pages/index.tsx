import { useState } from 'react';
import { toast } from 'react-hot-toast';

import { AddTokenForm, Board } from '@/components/pages-component/home-page';
import { Meta } from '@/layouts/Meta';
import { ApiInstance } from '@/services/api';
import { handleError } from '@/services/apiHelper';
import { Main } from '@/templates/Main';
import coinList from '@/utils/CoinGeckoCoinsList.json';

const HomePage = () => {
  const [tokens, setTokens] = useState<any[]>([]);

  const onAddToken = async (symbol: string) => {
    // https://pro-api.coingecko.com/api/v3/

    // get token id from token symbol, use coinList json fetch from Coingecko
    const coin = coinList.find((item) => item.symbol === symbol);

    const body = {
      ids: coin?.id,
      vs_currencies: 'usd',
      precision: '3',
    };

    const res = await ApiInstance.getTokenPrice(body);
    const { result, error } = handleError(res);
    if (error) {
      console.log('Something wrong in fetch token', error.message);
      toast.error('Something wrong in fetch token');
      return;
    }
    if (coin?.id) {
      const coinPrice = result?.[coin?.id].usd;
      const newToken = {
        symbol: coin?.symbol,
        name: coin?.name,
        price: coinPrice,
      };

      setTokens((current) => [
        ...current,
        { symbol: newToken.symbol, price: newToken.price },
      ]);
    }
  };

  // handle delete token
  const tokenDeleteHandle = (deleteToken: any) => {
    setTokens((current) => {
      const newTokens = current.filter(
        (token) => token.symbol !== deleteToken.symbol
      );
      return newTokens;
    });
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
