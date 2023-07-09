import { useState } from 'react';

import type { Coin } from '@/types/Coin';

export const ExportDataForm = ({ data }: { data: Coin[] }) => {
  const [isCopied, setIsCopied] = useState(false);
  const _onCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(data));
    setIsCopied(true);
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        className="rounded-md
            bg-green-500
            px-4 py-2
            text-white
          "
        onClick={_onCopy}
      >
        {isCopied ? 'Copied' : 'Copy to Clipboard'}
      </button>

      <div className="break-words">{JSON.stringify(data)}</div>
    </div>
  );
};
