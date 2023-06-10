import Link from 'next/link';
import React from 'react';

import { AppConfig } from '@/utils/AppConfig';
import coingeckoLogo from '@/utils/coingecko-logo.webp';

export const Footer = () => {
  return (
    <footer>
      <div className="flex flex-col flex-wrap md:flex-row md:items-center lg:items-start">
        <div className="w-full text-center md:mx-0 md:text-left lg:w-1/3">
          <div className="flex flex-col text-left text-sm">
            <Link className="hover:no-underline" href="/">
              <img
                className="w-32"
                alt="coingecko-logo"
                src={coingeckoLogo.src}
              />
            </Link>
            <div>
              CoinGecko provides a fundamental analysis of the crypto market. In
              addition to tracking price, volume and market capitalisation,
              CoinGecko tracks community growth, open-source code development,
              major events and on-chain metrics.
            </div>
          </div>
        </div>
        <div className="flex grow flex-wrap  text-center md:text-left">
          <div className=" w-full  px-4 md:w-1/2 lg:w-1/4">
            <h2 className=" mb-3 text-sm font-medium uppercase text-gray-900">
              About
            </h2>
            <nav className="mb-10 list-none">
              <li className="mt-3">
                <div className="cursor-pointer text-gray-500 hover:text-gray-900">
                  Company
                </div>
              </li>
              <li className="mt-3">
                <div className="cursor-pointer text-gray-500 hover:text-gray-900">
                  Careers
                </div>
              </li>
              <li className="mt-3">
                <div className="cursor-pointer text-gray-500 hover:text-gray-900">
                  Blog
                </div>
              </li>
            </nav>
          </div>
          <div className="w-full  px-4 md:w-1/2 lg:w-1/4">
            <h2 className="mb-3 text-sm font-medium uppercase tracking-widest text-gray-900">
              Support
            </h2>
            <nav className="mb-10 list-none">
              <li className="mt-3">
                <div className="cursor-pointer text-gray-500 hover:text-gray-900">
                  Contact Support
                </div>
              </li>
              <li className="mt-3">
                <div className="cursor-pointer text-gray-500 hover:text-gray-900">
                  Help Resources
                </div>
              </li>
              <li className="mt-3">
                <div className="cursor-pointer text-gray-500 hover:text-gray-900">
                  Release Updates
                </div>
              </li>
            </nav>
          </div>
          <div className="w-full  px-4 md:w-1/2 lg:w-1/4">
            <h2 className="mb-3 text-sm font-medium uppercase tracking-widest text-gray-900">
              Platform
            </h2>
            <nav className="mb-10 list-none">
              <li className="mt-3">
                <div className="cursor-pointer text-gray-500 hover:text-gray-900">
                  Terms &amp; Privacy
                </div>
              </li>
              <li className="mt-3">
                <div className="cursor-pointer text-gray-500 hover:text-gray-900">
                  Pricing
                </div>
              </li>
              <li className="mt-3">
                <div className="cursor-pointer text-gray-500 hover:text-gray-900">
                  FAQ
                </div>
              </li>
            </nav>
          </div>
          <div className="w-full  px-4 md:w-1/2 lg:w-1/4">
            <h2 className="mb-3 text-sm font-medium uppercase tracking-widest text-gray-900">
              Contact
            </h2>
            <nav className="mb-10 list-none">
              <li className="mt-3">
                <div className="cursor-pointer text-gray-500 hover:text-gray-900">
                  Send a Message
                </div>
              </li>
              <li className="mt-3">
                <div className="cursor-pointer text-gray-500 hover:text-gray-900">
                  Request a Quote
                </div>
              </li>
              <li className="mt-3">
                <div className="cursor-pointer text-gray-500 hover:text-gray-900">
                  +123-456-7890
                </div>
              </li>
            </nav>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-300 py-8 text-center text-sm">
        © Copyright {new Date().getFullYear()} {AppConfig.title}. Made with{' '}
        <a href="https://creativedesignsguru.com">CreativeDesignsGuru</a>.
      </div>
    </footer>
  );
};
