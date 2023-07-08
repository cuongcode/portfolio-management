import { ChevronDownIcon } from '@heroicons/react/outline';
import React, { useState } from 'react';

import { CreatePortfolioButton } from './create-portfolio-button';
import { SelectPortfolioButton } from './select-portfolio-button';

export const ManagePortfolioDropdown = () => {
  const [isDropdown, setIsDropdown] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        className=""
        onClick={() => setIsDropdown(!isDropdown)}
      >
        <ChevronDownIcon className="w-4" />
      </button>

      {isDropdown ? <DropDown /> : null}
    </div>
  );
};

const DropDown = () => {
  const allPortfolio = ['Portfolio 1', 'Portfolio 2'];
  const currentPortfolio = 'Portfolio 1';
  return (
    <div className="absolute -right-28 z-10 mt-2 w-56 divide-y divide-gray-300 rounded-md bg-white px-2 opacity-100 shadow-lg">
      <div className="py-1">
        <button
          type="button"
          className="w-full py-1 text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900"
        >
          All Portfolios
        </button>
      </div>
      <div className="py-1">
        {allPortfolio.map((item: any) => (
          <SelectPortfolioButton
            key={item}
            name={item}
            currentPortfolio={currentPortfolio}
          />
        ))}
      </div>
      <div className="py-1">
        <div className="py-1 text-gray-700 hover:bg-gray-100 hover:text-gray-900">
          <CreatePortfolioButton />
        </div>
      </div>
    </div>
  );
};
