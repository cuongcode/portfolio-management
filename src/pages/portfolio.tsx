import { ChevronRightIcon } from '@heroicons/react/outline';
import type {
  ChartConfiguration,
  ChartItem,
  ChartTypeRegistry,
} from 'chart.js/auto';
import Chart from 'chart.js/auto';
import React, { useEffect } from 'react';

import { MagnifyingGlassIcon, RefreshIcon } from '@/icons';
import { SideNavbar } from '@/templates/side-navbar';
import { STATIC_HOLDINGS_VALUE_DATA } from '@/utils/static-holdings-value-data';

const Portfolio = () => {
  return (
    <SideNavbar
      title="Portfolio"
      description="Portfolio"
      sideChildren={<RightSideSection />}
    >
      <div className="text-4xl font-semibold">Portfolio</div>
      <div className="text-xs">
        Add coins and start to manage your portfolio
      </div>

      <div className="mt-8">
        <div className="text-lg font-semibold">Stats</div>
      </div>
      <div className="mt-5">
        <div className="flex max-h-52 gap-3">
          <div className="w-1/2">
            <StatsCard />
          </div>
          <div className="flex w-1/2 items-center justify-center">
            <AllocationPieChart />
          </div>
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
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <MagnifyingGlassIcon className="h-4 w-4" />
            </span>
            <input
              type="text"
              placeholder="Search for new coin"
              className="w-full rounded-lg bg-white px-2 py-1 pl-8 text-xs font-light placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#d1e1fb]"
            />
          </div>
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
    <div className="flex h-full flex-col gap-6 rounded-xl bg-gradient-to-r from-[#2f72e3] to-[#d1e1fb] p-10 text-white">
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

const RightSideSection = () => {
  return (
    <div className="flex h-full flex-col p-3">
      <div className="h-1/2">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <MagnifyingGlassIcon className="h-4 w-4" />
          </span>
          <input
            type="text"
            placeholder="Search for new coin"
            className="w-full rounded-lg bg-[#f2f2f2] px-2 py-1 pl-8 text-xs font-light placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#d1e1fb]"
          />
        </div>
      </div>

      <div className="font-semibold">Recent Transactions</div>
      <div className="mt-5 flex flex-col gap-3">
        <RecentTransaction />
        <RecentTransaction />
        <RecentTransaction />
        <RecentTransaction />
      </div>
    </div>
  );
};

const RecentTransaction = () => {
  return (
    <div className="flex gap-2 text-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f2f2f2]">
        Sym
      </div>
      <div className="flex w-4/5 flex-col">
        <div className="flex items-center justify-between">
          <span className="font-semibold">BTC</span>
          <span className="font-semibold">$50</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-light">Sell</span>
          <span className="text-xs font-light">Today</span>
        </div>
      </div>
    </div>
  );
};

const AllocationPieChart = () => {
  const coin_id_list = STATIC_HOLDINGS_VALUE_DATA.map((item: any) => item.id);
  const holdings_value_list = STATIC_HOLDINGS_VALUE_DATA.map(
    (item: any) => item.holdings_value
  );
  useEffect(() => {
    const config: ChartConfiguration = {
      type: 'pie',
      data: {
        labels: coin_id_list,
        datasets: [
          {
            label: '',
            data: holdings_value_list,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            position: 'right',
            labels: {
              usePointStyle: true,
              pointStyle: 'circle',
              padding: 10,
            },
          },
        },
      },
    };

    let chart: Chart<keyof ChartTypeRegistry, any[], any>;
    const ctx = document.getElementById('allocation-piechart') as ChartItem;
    if (ctx) {
      chart = new Chart(ctx, config);
    }

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <div className="h-fit">
      <canvas id="allocation-piechart" />
    </div>
  );
};
