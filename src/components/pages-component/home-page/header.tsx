import React from 'react';

import ButtonDropdown from './button-dropdown';

const Header = () => {
  return (
    <div className="mb-10 flex justify-between">
      <div className="flex items-center">
        <h3 className="mr-2 font-bold">My Portfolio</h3>
        {/* add icon here to modify portfolio eg: rename, delete, ... */}
        <ButtonDropdown />
      </div>
    </div>
  );
};

export default Header;
