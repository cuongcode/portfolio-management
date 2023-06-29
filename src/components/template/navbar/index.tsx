import Link from 'next/link';
import React from 'react';

import { LoginSection } from '@/components/authentication/login-section';
import coingeckoLogo from '@/utils/coingecko-logo.webp';

export const Navbar = () => {
  return (
    <nav className="flex justify-between py-4">
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
