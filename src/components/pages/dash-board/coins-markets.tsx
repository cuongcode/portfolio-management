import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import type { CoinsMarketsApiBody } from '@/services/api';
import { ApiInstance } from '@/services/api';
import { handleError } from '@/services/apiHelper';

interface CoinsMarketItem {
  id: string;
  current_price: number;
  image: string; // link
  market_cap_rank: number;
  name: string;
  symbol: string;
  price_change_percentage_7d_in_currency: number;
  price_change_percentage_14d_in_currency: number;
  price_change_percentage_30d_in_currency: number;
  price_change_percentage_24h_in_currency: number;
}

export const CoinsMarkets = () => {
  const [coinsMarkets, setCoinsMarkets] = useState<CoinsMarketItem[]>([]);

  useEffect(() => {
    _onGetCoinsMarkets();
  }, []);

  const _onGetCoinsMarkets = async () => {
    // bitcoin, ethereum, cardano, binancecoin
    const body: CoinsMarketsApiBody = {
      vs_currency: 'usd',
      ids: '',
      order: 'market_cap_desc',
      price_change_percentage: '24h,7d,14d,30d',
      precision: '3',
    };
    const res = await ApiInstance.getCoinsMarkets(body);
    const { result, error } = handleError(res);
    if (error) {
      toast.error('Something wrong in fetch coin');
    }
    if (result) {
      const updatedCoinsMarkets = [...result].slice(0, 20);
      setCoinsMarkets(updatedCoinsMarkets);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="mb-2 flex items-center justify-between font-semibold">
        <span className="w-7">#</span>
        <span className="w-4/12">Coin</span>
        <span className="w-2/12">Price</span>
        <span className="w-16">24h</span>
        <span className="w-16">7d</span>
        <span className="w-16">14d</span>
        <span className="w-16">30d</span>
      </div>
      {coinsMarkets.map((item: CoinsMarketItem) => (
        <div
          key={item.id}
          className="flex items-center justify-between text-sm"
        >
          <span className="w-7">{item.market_cap_rank}</span>
          <span className="flex w-4/12 items-center gap-2">
            <img className="h-4 w-4" src={item.image} alt={item.name} />
            <span className="text-base font-semibold">{item.name}</span>{' '}
            {item.name.length < 15 ? (
              <span className="text-sm text-gray-600">
                {item.symbol.toUpperCase()}
              </span>
            ) : null}
          </span>
          <span className="w-2/12">{item.current_price}</span>
          <span className="w-16">
            {item.price_change_percentage_24h_in_currency.toFixed(1)}%
          </span>
          <span className="w-16">
            {item.price_change_percentage_7d_in_currency.toFixed(1)}%
          </span>
          <span className="w-16">
            {item.price_change_percentage_14d_in_currency.toFixed(1)}%
          </span>
          <span className="w-16">
            {item.price_change_percentage_30d_in_currency.toFixed(1)}%
          </span>
        </div>
      ))}
    </div>
  );
};
