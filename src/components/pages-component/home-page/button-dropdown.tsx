import React, { useState } from 'react';

const ButtonDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* <button type="button" className=" bg-red-300">
        <ChevronDownIcon className="w-5" />
      </button>
      <div className="fixed top-0 rounded-md p-5 text-lg shadow-md">
        <div>All Portfolio</div>
        <div>My Portfolio</div>
        <div>
          <PlusSmIcon className="w-5" />
          <div>Create Portfolio</div>
        </div>
      </div> */}
      <Test onToggle={() => setIsOpen(!isOpen)} isOpen={isOpen} />
    </div>
  );
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
        <button
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={onToggle}
        >
          Options
          <svg
            className="-mr-1 h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Dropdown menu, show/hide based on menu state.

    Entering: "transition ease-out duration-100"
      From: "transform opacity-0 scale-95"
      To: "transform opacity-100 scale-100"
    Leaving: "transition ease-in duration-75"
      From: "transform opacity-100 scale-100"
      To: "transform opacity-0 scale-95" */}
      <DropDown isOpen={isOpen} />
    </div>
  );
};

const DropDown = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div
      className={`absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 
      focus:outline-none ${
        !isOpen ? ' scale-95 opacity-0' : 'scale-100 opacity-100'
      } transition duration-100 ease-in`}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
    >
      <div className="py-1" role="none">
        {/* Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700"  */}
        <div
          className="block px-4 py-2 text-sm text-gray-700"
          role="menuitem"
          id="menu-item-0"
        >
          Edit
        </div>
        <div
          className="block px-4 py-2 text-sm text-gray-700"
          role="menuitem"
          id="menu-item-1"
        >
          Duplicate
        </div>
      </div>
      <div className="py-1" role="none">
        <div
          className="block px-4 py-2 text-sm text-gray-700"
          role="menuitem"
          id="menu-item-2"
        >
          Archive
        </div>
        <div
          className="block px-4 py-2 text-sm text-gray-700"
          role="menuitem"
          id="menu-item-3"
        >
          Move
        </div>
      </div>
      <div className="py-1" role="none">
        <div
          className="block px-4 py-2 text-sm text-gray-700"
          role="menuitem"
          id="menu-item-4"
        >
          Share
        </div>
        <div
          className="block px-4 py-2 text-sm text-gray-700"
          role="menuitem"
          id="menu-item-5"
        >
          Add to favorites
        </div>
      </div>
      <div className="py-1" role="none">
        <div
          className="block px-4 py-2 text-sm text-gray-700"
          role="menuitem"
          id="menu-item-6"
        >
          Delete
        </div>
      </div>
    </div>
  );
};
