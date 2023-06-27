import React from 'react';

import { ManagePortfolioDropdown } from './manage-portfolio-dropdown';

export const BoardHeader = ({ portfolioName }: { portfolioName: any }) => {
  return (
    <div className="flex items-center gap-2">
      <h3 className="font-bold">{portfolioName}</h3>
      <ManagePortfolioDropdown />
    </div>
  );
};
