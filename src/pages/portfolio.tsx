import { ChevronRightIcon } from '@heroicons/react/outline';
import React from 'react';

import { RefreshIcon } from '@/icons';
import { SideNavbar } from '@/templates/side-navbar';

const Portfolio = () => {
  return (
    <SideNavbar title="Portfolio" description="Portfolio" sideChildren>
      <div className="text-4xl font-semibold">Portfolio</div>
      <div className="text-xs">
        Add coins and start to manage your portfolio
      </div>

      <div className="mt-8">
        <div className="text-lg font-semibold">Stats</div>
      </div>
      <div className="mt-5">
        <div className="flex">
          <div className="w-1/2">
            <StatsCard />
          </div>
          <div className="w-1/2" />
        </div>
      </div>

      <div className="mt-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <div className="text-lg font-semibold">Coin Table</div>
            <button
              type="button"
              className="rounded-lg bg-white p-1 hover:bg-[#d1e1fb]"
            >
              <RefreshIcon className="h-4 w-4" />
            </button>
          </div>
          <input
            type="text"
            placeholder="Search for new coin"
            className="rounded-lg px-2 text-xs font-light"
          />
        </div>
      </div>
      <div className="mt-5">
        <CoinTable />
      </div>
    </SideNavbar>
  );
};

export default Portfolio;

const CoinTable = () => {
  return (
    <div className="flex flex-col">
      <TableHead />
      <div className="mt-3 flex flex-col gap-2">
        <TableRow />
        <TableRow />
        <TableRow />
      </div>
    </div>
  );
};

const TableHead = () => {
  return (
    <div className="flex items-center rounded-2xl bg-white p-2 text-sm font-medium">
      <span className="w-7">#</span>
      <span className="w-3/12">Coin</span>
      <span className="w-3/12">Current Price</span>
      <span className="w-3/12">Avg Price</span>
      <span className="w-3/12">Holdings</span>
      <span className="w-20">PNL</span>
    </div>
  );
};

const TableRow = () => {
  return (
    <div className="flex items-center rounded-2xl bg-white p-2 text-sm">
      <span className="w-7">1</span>
      <div className="flex w-3/12 items-center gap-2">
        <span className="font-medium">Bitcoin</span>
        <span className="text-xs font-light">BTC</span>
      </div>
      <div className="flex w-3/12 gap-1">
        <span>$</span>
        <span>30,000</span>
      </div>
      <div className="flex w-3/12 gap-1">
        <span>$</span>
        <span>29,000</span>
      </div>
      <div className="flex w-3/12 items-center gap-1">
        <span>0.05</span>
        <span className="text-xs font-light">BTC</span>
      </div>
      <div className="flex w-20 items-center justify-between">
        <div className="flex gap-1">
          <span>%</span>
          <span>5</span>
        </div>
        <button type="button">
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

const StatsCard = () => {
  return (
    <div className="flex flex-col gap-6 rounded-xl bg-gradient-to-r from-[#2f72e3] to-[#d1e1fb] p-10 text-white">
      <div className="flex flex-col items-start">
        <div className="text-xs">Total Balance</div>
        <div className="text-2xl font-bold">$50,000</div>
      </div>
      <div className="flex flex-col items-start">
        <div className="text-xs">Total Profit / Loss</div>
        <div className="text-xl font-bold">$2,000</div>
      </div>
    </div>
  );
};
