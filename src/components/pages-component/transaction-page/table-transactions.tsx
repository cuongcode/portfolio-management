import type { Transaction } from '@/types/Transaction';

export const TransactionsTable = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  return (
    <table className="table-fixed text-left">
      <thead>
        <tr className="border-t">
          <th>#</th>
          <th>Price Per Coin</th>
          <th>Quantity</th>
          <th>Total Spent</th>
          <th>Date</th>
          <th>Fees</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        {transactions?.map((transaction) => (
          <tr key={transaction.id} className="border-t">
            <td>{transaction.id}</td>
            <td>{transaction.price}</td>
            <td>{transaction.quantity}</td>
            <td>-</td>
            <td>{transaction.date}</td>
            <td>{transaction.fees}</td>
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
