import Link from 'next/link';
import React from 'react';

import coingeckoLogo from '@/utils/coingecko-logo.webp';

import { LoginSection } from './components/login-section';

export const Navbar = () => {
  return (
    <div className="flex justify-between">
      <NavBarIcon />
      <LoginSection />
    </div>
  );
};

const NavBarIcon = () => {
  return (
    <div className="flex">
      <Link className="hover:no-underline" href="/">
        <img className="w-32" alt="coingecko-logo" src={coingeckoLogo.src} />
      </Link>
    </div>
  );
};
