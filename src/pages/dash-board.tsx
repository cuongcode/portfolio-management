import React from 'react';

import { PriceLineChart } from '@/components/chart/price-line-chart';
import { TotalValueColumnChart } from '@/components/chart/total-value-bar-chart';
import { CoinsMarkets } from '@/components/pages/dash-board';
import { Cog6ToothIcon, Square2x2Icon, WalletIcon } from '@/icons';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const DashBoard = () => {
  return (
    <Main meta={<Meta title="Dashboard" description="Dashboard" />}>
      <div className="h-fit bg-[#f2f2f2]">
        <div className="m-auto flex max-w-screen-xl">
          <div className=" min-h-screen w-1/4 bg-white py-16 xl:w-1/5">
            <Menu />
          </div>
          <div className="flex w-3/4 flex-col p-10 xl:w-3/5">
            <div className="text-4xl font-semibold text-gray-800">
              Dashboard
            </div>
            <div className="text-xs">
              An overview of cryptocurrency portfolios and market
            </div>
            <div className="mt-6">
              <InfoSection />
            </div>
            <div className="mt-6">
              <div className="text-lg font-semibold">Portfolio Stats</div>
            </div>
            <div className="mt-6">
              <div className="h-fit rounded-xl bg-white p-5">
                <TotalValueColumnChart />
              </div>
            </div>
            <div className="mt-6">
              <div className="text-lg font-semibold">Explore Market</div>
            </div>
            <div className="mt-6">
              <div className="h-fit rounded-xl bg-white p-5">
                <CoinsMarkets />
              </div>
            </div>
          </div>
          <div className="hidden min-h-screen w-1/5 bg-white xl:flex" />
        </div>
      </div>
    </Main>
  );
};

export default DashBoard;

const MenuLink = ({ children }: { children: any }) => {
  return (
    <div className="flex cursor-pointer items-center gap-1 px-5 py-3 hover:border-l-4 hover:border-l-[#2f72e3] hover:bg-[#d1e1fb] hover:pl-4">
      {children}
    </div>
  );
};

const Menu = () => {
  return (
    <div className="flex flex-col">
      <div className="px-5 py-2 text-sm font-semibold">Menu</div>
      <MenuLink>
        <div className="rounded-md bg-[#d1e1fb] p-1">
          <Square2x2Icon className="h-4 w-4" />
        </div>
        <div>Dashboard</div>
      </MenuLink>
      <MenuLink>
        <div className="rounded-md bg-[#d1e1fb] p-1">
          <WalletIcon className="h-4 w-4" />
        </div>
        <div>Portfolio</div>
      </MenuLink>
      <MenuLink>
        <div className="rounded-md bg-[#d1e1fb] p-1">
          <Cog6ToothIcon className="h-4 w-4" />
        </div>
        <div>Setting</div>
      </MenuLink>
    </div>
  );
};

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
