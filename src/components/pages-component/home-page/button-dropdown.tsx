import {
  CheckIcon,
  ChevronDownIcon,
  PlusSmIcon,
} from '@heroicons/react/outline';
import React, { useState } from 'react';

import { ButtonCenterModal } from './button-center-modal';
import { AddNewPortfolioForm } from './form-add-new-portfolio';

const ButtonDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return <Test onToggle={() => setIsOpen(!isOpen)} isOpen={isOpen} />;
};

export default ButtonDropdown;

const Test = ({
  onToggle,
  isOpen,
}: {
  onToggle: () => void;
  isOpen: boolean;
}) => {
  return (
    <div className="relative inline-block text-left">
      <div>
        <button type="button" className=" " onClick={onToggle}>
          <ChevronDownIcon className="w-4" />
        </button>
      </div>

      <DropDown isOpen={isOpen} />
    </div>
  );
};

const DropDown = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div
      className={`absolute -right-28 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-300 rounded-md bg-white px-2 shadow-lg ring-1 ring-black/5 
      focus:outline-none ${
        !isOpen ? ' scale-95 opacity-0' : 'scale-100 opacity-100'
      } transition duration-100 ease-in`}
      role="menu"
    >
      <div className="py-1" role="none">
        {/* Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700"  */}
        <div
          className="block py-2 text-sm text-gray-700  hover:bg-gray-100 hover:text-gray-900"
          role="menuitem"
          id="menu-item-0"
        >
          <button type="button" className=" flex items-center ">
            All Portfolios
          </button>
        </div>
      </div>
      <div className="py-1" role="none">
        <div
          className="flex justify-between py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          role="menuitem"
          id="menu-item-2"
        >
          <button type="button" className=" flex items-center ">
            Current Portfolio
          </button>
          <CheckIcon className="w-5 text-green-600" />
        </div>
        <div
          className="flex justify-between py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          role="menuitem"
          id="menu-item-2"
        >
          <button type="button" className=" flex items-center ">
            Other Portfolio
          </button>
        </div>
      </div>
      <div className="py-1" role="none">
        <div
          className="block py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          role="menuitem"
          id="menu-item-4"
        >
          <ButtonCenterModal
            windtailStyle="flex items-center"
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
