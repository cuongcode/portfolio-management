import { UserCircleIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import React, { useContext } from 'react';

import coingeckoLogo from '@/utils/coingecko-logo.webp';
import { DataContext } from '@/utils/data-context';

import { ButtonCenterModal } from '../pages-component/home-page';
import { LoginForm } from '../pages-component/home-page/form-login';
import { Button } from './button';

export const Navbar = () => {
  const { saveDataToUser } = useContext(DataContext);
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
              <ButtonCenterModal
                tailwindStyle="
            rounded-md
            bg-green-500
            px-4 py-2
            text-white
            transition
            delay-150
            hover:scale-110
            duration-300
            hover:-translate-y-1"
                modalContent={<LoginForm />}
              >
                Sign Up
              </ButtonCenterModal>
            </div>
            <div className="mr-2">
              <button type="button" onClick={saveDataToUser}>
                Save
              </button>
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
