import { PencilIcon } from '@heroicons/react/outline';
import { useState } from 'react';

import type { Coin } from '@/types/Coin';
import type { Transaction } from '@/types/Transaction';

import { ModalCenter } from '../home-page';
import { DeleteTransactionButton } from './delete-transaction-button';
import { EditTransactionForm } from './form-edit-transaction';

export const TransactionsTable = ({
  transactions,
  avgNetCost,
  coin,
  holdings,
}: {
  transactions: Transaction[];
  avgNetCost: number;
  coin: Coin;
  holdings: number;
}) => {
  return (
    <table className="table-fixed text-left">
      <thead>
        <tr className="border-t">
          <th>Type</th>
          <th>Price Per Coin</th>
          <th>Quantity</th>
          <th>Fees</th>
          <th>Total Cost</th>
          <th>Date</th>
          <th>PNL</th>
          <th>Notes</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {transactions?.map((transaction) => (
          <tr key={transaction.id} className="border-t">
            <td className={transaction.buy ? 'text-green-500' : 'text-red-500'}>
              {transaction.buy ? 'Buy' : 'Sell'}
            </td>
            <td>$ {transaction.price}</td>
            <td className={transaction.buy ? 'text-green-500' : 'text-red-500'}>
              {transaction.quantity}
            </td>
            <td>$ {transaction.fees}</td>
            <td>
              {transaction.buy
                ? (transaction.price * transaction.quantity).toFixed(3)
                : (transaction.quantity * avgNetCost).toFixed(3)}
            </td>
            <td>{transaction.date.toString()}</td>
            <td>
              {transaction.buy
                ? '-'
                : -(
                    transaction.price * transaction.quantity -
                    transaction.avgNetCost * transaction.quantity
                  ).toFixed(3)}
            </td>
            <td>{transaction.notes}</td>
            <td className="flex items-center space-x-3">
              <EditTransactionButton
                coin={coin}
                transaction={transaction}
                holdings={holdings}
                avgNetCost={avgNetCost}
              />

              <DeleteTransactionButton coin={coin} transaction={transaction} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

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
