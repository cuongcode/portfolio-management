import Link from 'next/link';
import type { ReactNode } from 'react';
import React from 'react';

import { Cog6ToothIcon, Square2x2Icon, WalletIcon } from '@/icons';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

type ISideNavbarProps = {
  sideChildren: ReactNode | null;
  children: ReactNode;
  title: string;
  description: string;
};

export const SideNavbar = (props: ISideNavbarProps) => {
  return (
    <Main meta={<Meta title={props.title} description={props.description} />}>
      <div className="h-fit bg-[#f2f2f2]">
        <div className="m-auto flex max-w-screen-xl">
          <div className=" min-h-screen w-1/4 bg-white py-16 xl:w-1/5">
            <Menu />
          </div>
          <div className="flex w-3/4 flex-col p-10 xl:w-3/5">
            {props.children}
          </div>
          <div className="hidden min-h-screen w-1/5 bg-white xl:flex">
            {props.sideChildren}
          </div>
        </div>
      </div>
    </Main>
  );
};

const Menu = () => {
  return (
    <div className="flex flex-col">
      <div className="px-5 py-2 text-sm font-semibold">Menu</div>
      <MenuLink to="/dash-board/">
        <div className="rounded-md bg-[#d1e1fb] p-1">
          <Square2x2Icon className="h-4 w-4" />
        </div>
        <div>Dashboard</div>
      </MenuLink>
      <MenuLink to="/portfolio/">
        <div className="rounded-md bg-[#d1e1fb] p-1">
          <WalletIcon className="h-4 w-4" />
        </div>
        <div>Portfolio</div>
      </MenuLink>
      <MenuLink to="/">
        <div className="rounded-md bg-[#d1e1fb] p-1">
          <Cog6ToothIcon className="h-4 w-4" />
        </div>
        <div>Setting</div>
      </MenuLink>
    </div>
  );
};

const MenuLink = ({ children, to }: { children: any; to: string }) => {
  return (
    <Link href={to}>
      <div className="flex cursor-pointer items-center gap-1 px-5 py-3 hover:border-l-4 hover:border-l-[#2f72e3] hover:bg-[#d1e1fb] hover:pl-4">
        {children}
      </div>
    </Link>
  );
};
