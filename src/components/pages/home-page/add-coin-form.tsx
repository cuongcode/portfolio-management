import { debounce } from 'lodash';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

import { DataActions, selector, UserActions } from '@/redux';
import { ApiInstance } from '@/services/api';
import { handleError } from '@/services/apiHelper';
import type { Coin } from '@/types/Coin';
import coinList from '@/utils/CoinGeckoCoinsList.json';

export const AddCoinForm = () => {
  const { currentData } = useSelector(selector.data);
  const { currentUser, allUser } = useSelector(selector.user);
  const [symbol, setSymbol] = useState('');
  const [autocompleteList, setAutocompleteList] = useState<any[]>([]);

  const dispatch = useDispatch();

  const _debounceSearch = useCallback(
    debounce((text) => {
      _autoCompleteCoin(text);
    }, 500),
    []
  );

  const _autoCompleteCoin = async (searchString: string) => {
    if (!searchString) {
      setAutocompleteList([]);
      return;
    }

    const list = coinList
      .filter(
        (coin) => coin.symbol?.toLowerCase() === searchString?.toLowerCase()
      )
      .splice(0, 10);
    setAutocompleteList(list);
  };

  const _onAddCoin = async (coin: Coin) => {
    const body = {
      ids: coin?.id,
      vs_currencies: 'usd',
      precision: '3',
    };
    const res = await ApiInstance.getTokenPrice(body);
    const { result, error } = handleError(res);
    if (error) {
      toast.error('Something wrong in fetch coin');
      return;
    }
    if (coin?.id) {
      const coinPrice = result?.[coin.id].usd;
      const newCoin = { ...coin, price: coinPrice, transactions: [] };

      const updatedCurrentData = [...currentData, newCoin];
      const updatedCurrentUser = { ...currentUser, data: updatedCurrentData };
      const updatedAlluser = allUser.map((user: any) => {
        if (user.id === updatedCurrentUser.id) {
          return updatedCurrentUser;
        }
        return user;
      });
      dispatch(UserActions.setCurrentUser(updatedCurrentUser));
      dispatch(UserActions.setAllUser(updatedAlluser));
      dispatch(DataActions.setCurrentData(updatedCurrentData));
    }
  };

  const _onChangeSearchSymbol = (e: any) => {
    const searchSymbol = e.target.value;
    setSymbol(searchSymbol);
    _debounceSearch(searchSymbol);
  };

  return (
    <>
      <h2 className="mb-4 font-bold">Seach your favorite coin</h2>
      <div className="flex flex-col">
        <input
          className="mb-4 rounded-md border-2 p-2"
          type="text"
          id="symbol"
          name="symbol"
          placeholder="Enter Coin Name"
          value={symbol}
          onChange={_onChangeSearchSymbol}
        />

        {autocompleteList?.length ? (
          <div className="flex flex-col">
            {autocompleteList.map((item) => (
              <button
                key={item.symbol}
                type="button"
                onClick={() => _onAddCoin(item)}
              >
                <div>
                  {item.symbol} | {item.name}
                </div>
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
};
