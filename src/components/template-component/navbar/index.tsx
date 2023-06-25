import Link from 'next/link';
import React from 'react';

import coingeckoLogo from '@/utils/coingecko-logo.webp';

import { LoginSection } from './components/login-section';

export const Navbar = () => {
  return (
    <nav className="flex justify-between bg-red-200">
      <NavBarIcon />
      <LoginSection />
    </nav>
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
