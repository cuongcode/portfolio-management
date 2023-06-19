import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export const ExportForm = ({ data }: { data: any[] }) => {
  const [text, setText] = useState('Copy to Clipboard');
  const _onCopy = () => {
    setText('Copied');
  };

  return (
    <div className="flex flex-col">
      <CopyToClipboard text={JSON.stringify(data)} onCopy={_onCopy}>
        <button
          type="button"
          className="rounded-md
            bg-green-500
            px-4 py-2
            text-white
          "
        >
          {text}
        </button>
      </CopyToClipboard>

      <div className="">{JSON.stringify(data)}</div>
    </div>
  );
};
