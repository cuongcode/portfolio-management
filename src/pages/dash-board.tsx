import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { PriceLineChart } from '@/components/chart/price-line-chart';
import { TotalValueColumnChart } from '@/components/chart/total-value-bar-chart';
import { Meta } from '@/layouts/Meta';
import type { CoinsMarketsApiBody } from '@/services/api';
import { ApiInstance } from '@/services/api';
import { handleError } from '@/services/apiHelper';
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
    <div className="cursor-pointer px-5 py-3 hover:border-l-4 hover:border-l-[#2f72e3] hover:bg-[#d1e1fb] hover:pl-4">
      {children}
    </div>
  );
};

const Menu = () => {
  return (
    <div className="flex flex-col">
      <div className="px-5 py-2 text-sm font-semibold">Menu</div>
      <MenuLink>Dashboard</MenuLink>
      <MenuLink>Portfolio</MenuLink>
      <MenuLink>Setting</MenuLink>
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

const CoinsMarkets = () => {
  const [coinsMarkets, setCoinsMarkets] = useState<CoinsMarketItem[]>([]);

  useEffect(() => {
    _onGetCoinsMarkets();
  }, []);

  const _onGetCoinsMarkets = async () => {
    // bitcoin, ethereum, cardano, binancecoin
    const body: CoinsMarketsApiBody = {
      vs_currency: 'usd',
      ids: '',
      order: 'market_cap_desc',
      price_change_percentage: '24h,7d,14d,30d',
      precision: '3',
    };
    const res = await ApiInstance.getCoinsMarkets(body);
    const { result, error } = handleError(res);
    if (error) {
      toast.error('Something wrong in fetch coin');
    }
    if (result) {
      const updatedCoinsMarkets = [...result].slice(0, 20);
      setCoinsMarkets(updatedCoinsMarkets);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="mb-2 flex items-center justify-between font-semibold">
        <span className="w-7">#</span>
        <span className="w-4/12">Coin</span>
        <span className="w-2/12">Price</span>
        <span className="w-16">24h</span>
        <span className="w-16">7d</span>
        <span className="w-16">14d</span>
        <span className="w-16">30d</span>
      </div>
      {coinsMarkets.map((item: CoinsMarketItem) => (
        <div
          key={item.id}
          className="flex items-center justify-between text-sm"
        >
          <span className="w-7">{item.market_cap_rank}</span>
          <span className="flex w-4/12 items-center gap-2">
            <img className="h-4 w-4" src={item.image} alt={item.name} />
            <span className="text-base font-semibold">{item.name}</span>{' '}
            {item.name.length < 10 ? (
              <span className="text-sm text-gray-600">
                {item.symbol.toUpperCase()}
              </span>
            ) : null}
          </span>
          <span className="w-2/12">{item.current_price}</span>
          <span className="w-16">
            {item.price_change_percentage_24h_in_currency.toFixed(1)}%
          </span>
          <span className="w-16">
            {item.price_change_percentage_7d_in_currency.toFixed(1)}%
          </span>
          <span className="w-16">
            {item.price_change_percentage_14d_in_currency.toFixed(1)}%
          </span>
          <span className="w-16">
            {item.price_change_percentage_30d_in_currency.toFixed(1)}%
          </span>
        </div>
      ))}
    </div>
  );
};

interface CoinsMarketItem {
  id: string;
  current_price: number;
  image: string; // link
  market_cap_rank: number;
  name: string;
  symbol: string;
  price_change_percentage_7d_in_currency: number;
  price_change_percentage_14d_in_currency: number;
  price_change_percentage_30d_in_currency: number;
  price_change_percentage_24h_in_currency: number;
}
