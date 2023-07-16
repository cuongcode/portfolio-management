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

  return {
    getTokenPrice,
    getTrending,
    //
    setAuthToken,
  };
};

export const ApiInstance = create();
