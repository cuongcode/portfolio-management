import '../styles/global.css';

import type { AppProps } from 'next/app';
import { useContext } from 'react';

import { DataContext, DataContextProvider } from '@/utils/data-context';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <DataContextProvider>
      <>
        <Component {...pageProps} />
        <Test />
      </>
    </DataContextProvider>
  );
};

export default MyApp;

const Test = () => {
  const data = useContext(DataContext);
  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>
          <div>{item.id}</div>
          <div>{item.name}</div>
          <div>{item.price}</div>
          <div>{item.symbol}</div>
        </div>
      ))}
    </div>
  );
};
