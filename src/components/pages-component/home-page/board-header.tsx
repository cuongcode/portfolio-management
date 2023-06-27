import React from 'react';

import ButtonDropdown from './button-dropdown';

export const BoardHeader = () => {
  return (
    <div className="flex items-center">
      <h3 className="mr-2 font-bold">My Portfolio</h3>

      <ButtonDropdown />
    </div>
  );
};
