import Link from 'next/link';
import React from 'react';

import { IllustationImage } from '@/images/illustation';
import { LogoImage } from '@/images/logo';

const TEST_DATA = [
  { name: 'Bitcoin', price: 31000, symbol: 'btc' },
  { name: 'Ethereum', price: 1900, symbol: 'eth' },
  { name: 'Cardano', price: 0.2, symbol: 'ada' },
  { name: 'BNB', price: 295, symbol: 'bnb' },
];

const LandingPage = () => {
  return (
    <div className="h-screen bg-white">
      <NavBar />
      <div className="h-full bg-[#f2f2f2] px-16 py-10">
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
    </div>
  );
};

export default LandingPage;

const TopCoinBoard = () => {
  return (
    <div className="relative border-2 p-2 pt-4">
      <div className="absolute -top-4 bg-[#efc12d] px-2">Top Coins</div>
      <div className="flex flex-col divide-y-2">
        {TEST_DATA.map((item: any) => (
          <div
            key={item.name}
            className="flex items-center gap-1 text-sm text-gray-700"
          >
            <span>
              <img
                src={`https://cryptoicons.org/api/icon/${item.symbol}/18`}
                alt={item.name}
              />
            </span>
            <span className="w-5/12">{item.name}</span>
            <span>{item.price}$</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const NavBar = () => {
  return (
    <div className="m-auto flex max-w-screen-xl items-center justify-between bg-white p-3">
      <Link href="/">
        <img className="h-10" src={LogoImage.logo.src} alt="logo" />
      </Link>
      <div className="flex gap-7">
        <button type="button" className="text-xs">
          Sign in
        </button>
        <Link href="/home-page/">
          <button className="h-7 w-24 bg-[#2f72e3] text-xs text-white hover:bg-gray-800">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};
