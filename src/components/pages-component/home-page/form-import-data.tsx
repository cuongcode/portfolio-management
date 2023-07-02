import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { DataActions } from '@/redux';

export const ImportDataForm = ({ onClose }: { onClose: () => void }) => {
  const [data, setData] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();

  const _validate = () => {
    if (data === '') {
      setError('Please input your data');
      return false;
    }
    let parseData;
    try {
      parseData = JSON.parse(data);
    } catch (err) {
      setError('Please input valid data');
    }
    // to-do: check if data has correct interface
    // errer occur when data is valid JSON but not valid interface
    return parseData;
  };

  const _onImport = () => {
    if (!_validate()) {
      return;
    }
    const importData = JSON.parse(data);
    dispatch(DataActions.setCurrentData(importData));
    setData('');
    onClose();
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        className="rounded-md bg-green-500 px-4 py-2 text-white"
        onClick={_onImport}
      >
        Import
      </button>

      <input
        className="rounded-md border-2 p-2"
        type="text"
        placeholder="Paste your data here"
        value={data}
        onChange={(e: any) => setData(e.target.value)}
      />

      <div className="text-red-500">{error}</div>
    </div>
  );
};
