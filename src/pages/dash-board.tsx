import React from 'react';

import { PriceLineChart } from '@/components/chart/price-line-chart';
import { TotalValueColumnChart } from '@/components/chart/total-value-bar-chart';
import { CoinsMarkets } from '@/components/pages/dash-board';
import { SideNavbar } from '@/templates/side-navbar';

const DashBoard = () => {
  return (
    <SideNavbar title="Dashboard" description="Dashboard" sideChildren>
      <div className="text-4xl font-semibold text-gray-800">Dashboard</div>
      <div className="text-xs">
        An overview of cryptocurrency portfolios and market
      </div>
      <div className="mt-8">
        <InfoSection />
      </div>
      <div className="mt-8">
        <div className="text-lg font-semibold">Portfolio Stats</div>
      </div>
      <div className="mt-5">
        <div className="h-fit rounded-xl bg-white p-5">
          <TotalValueColumnChart />
        </div>
      </div>
      <div className="mt-8">
        <div className="text-lg font-semibold">Explore Market</div>
      </div>
      <div className="mt-5">
        <div className="h-fit rounded-xl bg-white p-5">
          <CoinsMarkets />
        </div>
      </div>
    </SideNavbar>
  );
};

export default DashBoard;

const InfoSection = () => {
  return (
    <section className="flex w-full gap-4">
      <div className="w-1/2 rounded-xl bg-gradient-to-r from-[#2f72e3] to-[#d1e1fb] p-10 text-white">
        <div className="text-xs">My Portfolio</div>
        <div className="flex flex-col items-start md:flex-row md:items-center md:gap-4">
          <div className="text-2xl font-bold">$50,000</div>
          <div>5.5%</div>
        </div>
        <div>$32,000</div>
        <div className="float-right">BTC</div>
      </div>
      <div className="flex w-1/2 rounded-xl bg-white p-3">
        <PriceLineChart />
      </div>
    </section>
  );
};
