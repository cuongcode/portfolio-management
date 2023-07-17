import Link from 'next/link';
import type { ReactNode } from 'react';

import { LogoImage } from '@/images/logo';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="h-fit bg-white text-gray-700 antialiased">
    {props.meta}
    {/* <Header title={AppConfig.title} description={AppConfig.description} /> */}
    <NavBar />
    <main className="content">{props.children}</main>
    {/* <Footer /> */}
  </div>
);

export { Main };

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
