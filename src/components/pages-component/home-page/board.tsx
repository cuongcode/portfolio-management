import { useState } from 'react';
import toast from 'react-hot-toast';

import { ApiInstance } from '@/services/api';
import { handleError } from '@/services/apiHelper';
import coinList from '@/utils/CoinGeckoCoinsList.json';

import { ButtonCenterModal } from './button-center-modal';
import { AddNewCoinForm } from './form-add-new-coin';
import { CoinsTable } from './table-coins';

export const Board = () => {
  const [tokens, setTokens] = useState<any[]>([]);

  const handleAddToken = async (symbol: string) => {
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
        { symbol: newToken.name, price: newToken.price },
      ]);
    }
  };

  const tokenDeleteHandle = (deleteToken: any) => {
    setTokens((current) => {
      const newTokens = current.filter(
        (token) => token.symbol !== deleteToken.symbol
      );
      return newTokens;
    });
  };

  return (
    <div className="flex min-h-screen flex-col rounded-md border-[1px] border-gray-400 p-4">
      <div className="mb-10 flex justify-between">
        <div className="flex items-center">
          <h3 className="mr-2 font-bold">My Portfolio</h3>
          {/* add icon here to modify portfolio eg: rename, delete, ... */}
          <div className=" cursor-pointer ">+</div>
        </div>
        <ButtonCenterModal
          style="
            rounded-md
            bg-green-500
            px-4 py-2
            text-white
            transition
            delay-150
            hover:scale-110
            duration-300
            hover:-translate-y-1"
          text="Add New Coin"
          modalContent={<AddNewCoinForm onFormSubmit={handleAddToken} />}
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

      <CoinsTable coins={tokens} coinDelete={tokenDeleteHandle} />
    </div>
  );
};
