import { useState } from 'react';

import { TextInput } from '@/components/base';

export const ImportForm = ({
  onImportData,
}: {
  onImportData: (text: string) => void;
}) => {
  const [data, setData] = useState('');

  const _onChange = (e: any) => {
    setData(e.target.value);
  };

  const _onImport = () => {
    onImportData(data);
    setData('');
  };

  return (
    <div className="flex flex-col">
      <button
        type="button"
        className="rounded-md
            bg-green-500
            px-4 py-2
            text-white
          "
        onClick={_onImport}
      >
        Import
      </button>

      <TextInput
        title="Import data"
        type="text"
        name="import-data"
        placeholder="Paste your data here"
        value={data}
        onChange={_onChange}
      />
    </div>
  );
};
