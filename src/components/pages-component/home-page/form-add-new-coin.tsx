import { debounce } from 'lodash';
import { useCallback, useState } from 'react';

import type { Coin } from '@/types/Coin';
import coinList from '@/utils/CoinGeckoCoinsList.json';

export const AddNewCoinForm = ({
  onFormSubmit,
}: {
  onFormSubmit: (coin: Coin) => void;
}) => {
  const [symbol, setSymbol] = useState('');
  const [autocompleteList, setAutocompleteList] = useState<any[]>([]);

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

  const _onSubmit = (coin: any) => {
    onFormSubmit(coin);
    setSymbol('');
    setAutocompleteList([]);
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
                onClick={() => _onSubmit(item)}
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
