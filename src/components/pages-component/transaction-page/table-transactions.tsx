export const TransactionsTable = ({
  transactions,
  transactionDelete,
}: {
  transactions: any;
  transactionDelete: (transaction: any) => void;
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
        {transactions.map((item, index) => (
          <tr key={item.name} className="border-t">
            <td>{index}</td>
            <td>{item.price}</td>
            <td>{item.quantity}</td>
            <td>{item.date}</td>
            <td>{item.fees}</td>
            <td>{item.notes}</td>
            <td className="flex flex-col items-center">
              <button
                type="button"
                className="w-fit"
                onClick={() => transactionDelete(item)}
              >
                -
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
