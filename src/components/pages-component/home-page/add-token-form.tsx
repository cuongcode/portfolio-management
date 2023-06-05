import { debounce } from 'lodash';
import { useCallback, useState } from 'react';

import coinList from '@/utils/CoinGeckoCoinsList.json';

export function AddTokenForm({
  onFormSubmit,
}: {
  onFormSubmit: (token: string) => void;
}) {
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
    <div className="relative">
      <div>Token:</div>
      <input
        type="text"
        id="token"
        name="token"
        placeholder="Input token here"
        value={token}
        onChange={_onChangeSearchString}
      />
      {autocompleteList?.length ? (
        <div className="absolute left-0 top-10 flex flex-col gap-2 rounded-md bg-gray-200 p-2">
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
      <button type="submit" disabled={!token} onClick={() => _onSubmit()}>
        Add Token
      </button>
    </div>
  );
}
