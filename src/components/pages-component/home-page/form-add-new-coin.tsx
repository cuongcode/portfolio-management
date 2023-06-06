import { debounce } from 'lodash';
import { useCallback, useState } from 'react';

import coinList from '@/utils/CoinGeckoCoinsList.json';

export const AddNewCoinForm = ({
  onFormSubmit,
}: {
  onFormSubmit: (token: string) => void;
}) => {
  const [token, setToken] = useState('');
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
      .filter((coin) => coin.symbol?.includes(searchString?.toLowerCase()))
      .splice(0, 10);
    setAutocompleteList(list);
  };

  const _onSubmit = (inputSymbol?: string) => {
    onFormSubmit(inputSymbol || token);
    setToken('');
    setAutocompleteList([]);
  };

  const _onChangeSearchString = (e: any) => {
    const searchString = e.target.value;
    setToken(searchString);
    _debounceSearch(searchString);
  };

  return (
    <>
      <h2 className="mb-4 font-bold">Seach your favorite coin</h2>
      <div className="flex flex-col">
        <input
          className="mb-4 rounded-md border-2 p-2"
          type="text"
          id="token"
          name="token"
          placeholder="Enter Coin Name"
          value={token}
          onChange={_onChangeSearchString}
        />
        {/* List of coins as buttons to choose show here */}
        {/* <button
          className="text-left"
          type="submit"
          disabled
          onClick={onFormClick}
        >
          BTC
        </button>
        <button className="text-left" type="submit" disabled>
          ETH
        </button> */}

        {autocompleteList?.length ? (
          <div className="flex flex-col">
            {autocompleteList.map((item) => (
              <button
                key={item.name}
                type="button"
                onClick={() => _onSubmit(item.symbol)}
              >
                <div>({item.symbol})</div>
                <div>{item.name}</div>
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
};
