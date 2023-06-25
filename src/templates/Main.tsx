import type { ReactNode } from 'react';

import { Navbar } from '@/components/template-component';
import { Footer } from '@/components/template-component/footer';
import { AppConfig } from '@/utils/AppConfig';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="w-full px-1 text-gray-700 antialiased">
    {props.meta}

    <div className="mx-auto max-w-screen-xl px-5 text-sm">
      <header className="border-b border-gray-300 pb-4">
        <div className="pb-8 pt-16">
          <h1 className="text-3xl font-bold text-gray-900">
            {AppConfig.title}
          </h1>
          <h2 className="text-xl">{AppConfig.description}</h2>
        </div>
        <Navbar />
      </header>

      <main className="content py-5 ">{props.children}</main>

      <Footer />
    </div>
  </div>
);

export { Main };
