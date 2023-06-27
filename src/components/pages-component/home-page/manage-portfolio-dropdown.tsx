import {
  CheckIcon,
  ChevronDownIcon,
  PlusSmIcon,
} from '@heroicons/react/outline';
import React, { useState } from 'react';

import { ButtonCenterModal } from './button-center-modal';
import { AddNewPortfolioForm } from './form-add-new-portfolio';

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
        <div className="flex justify-between py-1 text-gray-700 hover:bg-gray-100 hover:text-gray-900">
          <button type="button" className=" flex items-center ">
            Current Portfolio
          </button>
          <CheckIcon className="w-5 text-green-600" />
        </div>
        <div className="py-1 text-gray-700 hover:bg-gray-100 hover:text-gray-900">
          <button type="button">Other Portfolio</button>
        </div>
      </div>
      <div className="py-1">
        <div className="py-1 text-gray-700 hover:bg-gray-100 hover:text-gray-900">
          <ButtonCenterModal
            className="flex items-center"
            modalContent={<AddNewPortfolioForm />}
          >
            <PlusSmIcon className="mr-2 w-5" />
            <div> Create Portfolio</div>
          </ButtonCenterModal>
        </div>
      </div>
    </div>
  );
};

const PortfolioButton = () => {
  return (
    <div className="flex justify-between py-1 text-gray-700 hover:bg-gray-100 hover:text-gray-900">
      <button type="button" className=" flex items-center ">
        Current Portfolio
      </button>
      <CheckIcon className="w-5 text-green-600" />
    </div>
  );
};
