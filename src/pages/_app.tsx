import '../styles/global.css';

import type { AppProps } from 'next/app';

import { DataProvider } from '@/utils/data-context';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <DataProvider>
      <Component {...pageProps} />
    </DataProvider>
  );
};

export default MyApp;
