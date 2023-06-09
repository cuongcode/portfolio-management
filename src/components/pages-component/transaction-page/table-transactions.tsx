export const TransactionsTable = () => {
  // if (transactions?.length === 0) {
  //   return null;
  // }
  const transactions = [
    {
      price: 23321,
      quantity: 213,
      date: 2323,
      fees: 324,
      notes: 'sdfdfs',
    },
    {
      price: 23321,
      quantity: 213,
      date: 2323,
      fees: 324,
      notes: 'sdfdfs',
    },
    {
      price: 23321,
      quantity: 213,
      date: 2323,
      fees: 324,
      notes: 'sdfdfs',
    },
  ];
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
        {transactions?.map((transaction, index) => (
          <tr key={transaction.name} className="border-t">
            <td>{index}</td>
            <td>{transaction.price}</td>
            <td>{transaction.quantity}</td>
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
