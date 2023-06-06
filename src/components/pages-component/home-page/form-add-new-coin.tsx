export const AddNewCoinForm = () => {
  return (
    <>
      <h2 className="mb-4 font-bold">Seach your favorite coin</h2>
      <div className="flex flex-col">
        <input
          className="mb-4 rounded-md border-2 p-2"
          type="text"
          placeholder="Enter Coin Name"
        />
        {/* List of coins as buttons to choose show here */}
        <button className="text-left" type="submit" disabled>
          BTC
        </button>
        <button className="text-left" type="submit" disabled>
          ETH
        </button>
      </div>
    </>
  );
};
