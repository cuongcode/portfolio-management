import { UserCircleIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import React from 'react';

import coingeckoLogo from '@/utils/coingecko-logo.webp';

import { Button } from './button';

export const Navbar = () => {
  const isLogin = false;
  return (
    <div className="flex justify-between">
      <div className="flex">
        <Link className="hover:no-underline" href="/">
          <img className="w-32" alt="coingecko-logo" src={coingeckoLogo.src} />
        </Link>
      </div>
      <div className="flex items-center">
        {!isLogin ? (
          <>
            <div className="mr-2">
              <Button>Login</Button>
            </div>
            <div className="">
              <Button>Sign Up</Button>
            </div>
          </>
        ) : (
          <div>
            <UserCircleIcon className="w-7" />
          </div>
        )}
      </div>
    </div>
  );
};
