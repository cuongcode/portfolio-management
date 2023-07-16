import apisauce from 'apisauce';
import axios from 'axios';

const axiosApiCoingecko = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    // 'Cache-Control': 'no-cache',
  },
  timeout: 50000,
});

const create = () => {
  const apiCoingecko = apisauce.create({
    // @ts-ignore
    axiosInstance: axiosApiCoingecko,
  });

  // SET AUTH TOKEN
  const setAuthToken = (userAuth?: string) => {
    if (userAuth) {
      apiCoingecko.setHeader('Authorization', `Bearer ${userAuth}`);
    } else {
      apiCoingecko.setHeader('Authorization', '');
    }
  };

  // API function

  // TEST
  const getTokenPrice = (body: any) => apiCoingecko.get('simple/price', body);
  const getTrending = () => apiCoingecko.get('search/trending');
  const getCoinsMarkets = (body: CoinsMarketsApiBody) =>
    apiCoingecko.get('coins/markets', body);

  return {
    getTokenPrice,
    getTrending,
    getCoinsMarkets,
    //
    setAuthToken,
  };
};

export const ApiInstance = create();

export interface CoinsMarketsApiBody {
  vs_currency: string; // usd
  ids: string;
  order: string; // market_cap_desc
  price_change_percentage: string; // 24h,7d,14d,30d
  precision: string; // 3
}
