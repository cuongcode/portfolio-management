import React from 'react';

export const AddNewPortfolioForm = () => {
  return (
    <>
      <h2 className="mb-4 font-bold">New Portfolio</h2>
      <div className="flex flex-col">
        <input
          className="mb-4 rounded-md border-2 p-2"
          type="text"
          id="symbol"
          name="symbol"
          placeholder="My Portfolio"
        />
        <div className="flex justify-between space-x-2">
          <button className="grow rounded-md border-2 p-2 " type="button">
            Cancel
          </button>
          <button
            className="grow rounded-md bg-green-500 p-2 text-white"
            type="submit"
          >
            Create
          </button>
        </div>
      </div>
    </>
  );
};
