import type { Transaction } from '@/types/Transaction';

export const TransactionsTable = ({
  transactions,
  avgNetCost,
}: {
  transactions: Transaction[];
  avgNetCost: number;
}) => {
  return (
    <table className="table-fixed text-left">
      <thead>
        <tr className="border-t">
          <th>#</th>
          <th>Price Per Coin</th>
          <th>Quantity</th>
          <th>Fees</th>
          <th>Total Cost</th>
          <th>Date</th>
          <th>PNL</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        {transactions?.map((transaction) => (
          <tr key={transaction.id} className="border-t">
            <td>{transaction.id}</td>
            <td>$ {transaction.price}</td>
            <td>{transaction.quantity}</td>
            <td>$ {transaction.fees}</td>
            <td>
              {transaction.buy
                ? (transaction.price * transaction.quantity).toFixed(3)
                : (transaction.quantity * avgNetCost).toFixed(3)}
            </td>
            <td>{transaction.date}</td>
            <td>
              {transaction.buy
                ? '-'
                : -(
                    transaction.price * transaction.quantity -
                    transaction.avgNetCost * transaction.quantity
                  ).toFixed(3)}
            </td>
            <td>{transaction.notes}</td>
            <td className="flex flex-col items-center">
              <button type="button" className="w-fit">
                -
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
