import React from 'react';

import { AppConfig } from '@/utils/AppConfig';
import coingeckoLogo from '@/utils/coingecko-logo.webp';

import { FooterHeader, FooterLinkBoard } from './components/index';

const FOOTER_LINK_SECTIONS = [
  { title: 'about', links: ['Company', 'Careers', 'Blogs'] },
  {
    title: 'Support',
    links: ['Contact Support', 'Help Resources', 'Release Updates'],
  },
  { title: 'Platform', links: ['Terms & Privacy', 'Pricing', 'FAQ'] },
  {
    title: 'Contact',
    links: ['Send a Message', 'Request a Quote', '+123-456-7890'],
  },
];

const FOOTER_HEADER_INFO = {
  logo: { path: coingeckoLogo.src, alt: 'coingecko-logo' },
  description:
    'CoinGecko provides a fundamental analysis of the crypto market. In addition to tracking price, volume and market capitalisation, CoinGecko tracks community growth, open-source code development, major events and on-chain metrics.',
};

export const Footer = () => {
  return (
    <footer>
      <div className="flex flex-col flex-wrap md:flex-row md:items-center lg:items-start">
        <div className="w-full text-center md:mx-0 md:text-left lg:w-1/3">
          <FooterHeader
            logo={FOOTER_HEADER_INFO.logo}
            description={FOOTER_HEADER_INFO.description}
          />
        </div>
        <div className="flex grow flex-wrap  text-center md:text-left">
          <FooterLinkBoard footerLinkSections={FOOTER_LINK_SECTIONS} />
        </div>
      </div>
      <div className="border-t border-gray-300 py-8 text-center text-sm">
        © Copyright {new Date().getFullYear()} {AppConfig.title}. Made with{' '}
        <a href="https://creativedesignsguru.com">CreativeDesignsGuru</a>.
      </div>
    </footer>
  );
};
