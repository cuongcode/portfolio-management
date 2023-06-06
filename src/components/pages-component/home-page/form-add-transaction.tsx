export const AddTransactionForm = () => {
  const inputStyle = 'mb-4 rounded-md border-2 p-2';
  return (
    <>
      <h2 className="mb-4 text-3xl">Add transaction</h2>
      <div className="flex flex-col text-base">
        <div>Total Spent</div>
        <input className={inputStyle} type="text" placeholder="USD" />

        <div>Quantity</div>
        <input className={inputStyle} type="text" placeholder="1" />

        <div>Price Per Coin</div>
        <input className={inputStyle} type="text" placeholder="USD" />

        {/* how to create a calender */}
        <div>Date</div>
        <input className={inputStyle} type="text" placeholder="datetime" />

        <div>Fees</div>
        <input className={inputStyle} type="text" placeholder="USD" />

        <div>Notes</div>
        <input className={inputStyle} type="text" placeholder="Optional" />

        <div className="flex justify-between space-x-2">
          <button
            className="grow rounded-md border-2 p-2"
            type="submit"
            disabled
          >
            Cancel
          </button>
          <button
            type="button"
            className="grow rounded-md bg-green-500 p-2"
            disabled
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};
