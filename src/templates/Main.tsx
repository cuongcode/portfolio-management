import type { ReactNode } from 'react';

import { Footer, Header, Navbar } from '@/components/template';
import { AppConfig } from '@/utils/AppConfig';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="w-full px-1 text-gray-700 antialiased">
    {props.meta}

    <div className="mx-auto max-w-screen-xl px-5 text-sm">
      <Header title={AppConfig.title} description={AppConfig.description} />
      <Navbar />
      <main className="content py-5 ">{props.children}</main>
      <Footer />
    </div>
  </div>
);

export { Main };
