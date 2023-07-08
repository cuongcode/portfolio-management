import { PencilIcon } from '@heroicons/react/outline';
import { useState } from 'react';

import { ModalCenter } from '../home-page';
import { EditTransactionForm } from './form-edit-transaction';

export const EditTransactionButton = ({
  coin,
  transaction,
  holdings,
  avgNetCost,
}: {
  coin: any;
  transaction: any;
  holdings: any;
  avgNetCost: any;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button type="button" onClick={() => setIsOpen(true)}>
        <PencilIcon className="w-4" />
      </button>
      <ModalCenter open={isOpen} onClose={() => setIsOpen(false)}>
        <EditTransactionForm
          coin={coin}
          transaction={transaction}
          holdings={holdings}
          avgNetCost={avgNetCost}
          onClose={() => setIsOpen(false)}
        />
      </ModalCenter>
    </div>
  );
};
