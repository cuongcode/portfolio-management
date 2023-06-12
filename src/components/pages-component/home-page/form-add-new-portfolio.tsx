import React from 'react';

export const AddNewPortfolioForm = () => {
  return (
    <>
      <h2 className="mb-4 font-bold">Seach your favorite coin</h2>
      <div className="flex flex-col">
        <input
          className="mb-4 rounded-md border-2 p-2"
          type="text"
          id="symbol"
          name="symbol"
          placeholder="Enter Coin Name"
        />
      </div>
    </>
  );
};
