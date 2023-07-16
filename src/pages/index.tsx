import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { IllustationImage } from '@/images/illustation';
import { Meta } from '@/layouts/Meta';
import { ApiInstance } from '@/services/api';
import { handleError } from '@/services/apiHelper';
import { Main } from '@/templates/Main';

const LandingPage = () => {
  return (
    <Main meta={<Meta title="Landing" description="Landing" />}>
      <div className="h-fit bg-[#f2f2f2] px-16 pb-20 pt-16">
        <div className="m-auto flex h-fit max-w-screen-lg bg-white">
          <div className="flex w-5/12 flex-col px-12 pb-12 pt-28">
            <div className="text-5xl font-bold text-gray-800">
              Your Crypto Portfolio
            </div>
            <div className="text-4xl font-bold text-[#2f72e3]">Start Here.</div>
            <div className="my-10 flex flex-col text-xs">
              <span>Manage your cryptocurrency as easy as winking.</span>
              <span>Sign up and get started right away.</span>
            </div>
            <Link href="/home-page/">
              <button className="h-7 w-24 bg-[#2f72e3] text-xs text-white hover:bg-gray-800">
                Get Started
              </button>
            </Link>
            <div className="mt-20">
              <TopCoinBoard />
            </div>
          </div>
          <div className="w-7/12 py-32">
            <img
              className=""
              src={IllustationImage.illustation.src}
              alt="illustation"
            />
          </div>
        </div>
      </div>
    </Main>
  );
};

export default LandingPage;

const TopCoinBoard = () => {
  const [trendList, setTrendList] = useState<any>([]);

  useEffect(() => {
    _onGetTrend();
  }, []);

  const _onGetTrend = async () => {
    const res = await ApiInstance.getTrending();
    const { result, error } = handleError(res);
    if (error) {
      toast.error('Something wrong in fetch coin');
      return;
    }
    const updatedTrendList = result?.coins
      .slice(0, 4)
      .map((item: any) => item.item);
    setTrendList(updatedTrendList);
  };

  return (
    <div className="relative border-2 p-2 pt-4">
      <button
        type="button"
        onClick={_onGetTrend}
        className="absolute -top-4 bg-[#efc12d] px-2"
      >
        Trending
      </button>
      <div className="flex flex-col divide-y-2">
        {trendList.map((item: trendItem) => (
          <div
            key={item.id}
            className="flex items-center gap-1 text-sm text-gray-700"
          >
            <span className="w-1/12">
              <img className="w-4" src={item.thumb} alt={item.name} />
            </span>
            <span className="w-5/12">{item.name}</span>
            <span className="">Rank #{item.market_cap_rank}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export interface trendItem {
  coin_id: number;
  id: string;
  large: string; // img link
  market_cap_rank: number;
  name: string;
  price_btc: number;
  score: number;
  slug: string;
  small: string; // img link
  symbol: string;
  thumb: string; // img link
}
