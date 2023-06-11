import '../styles/global.css';

import type { AppProps } from 'next/app';

import { DataContextProvider } from '@/utils/data-context';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <DataContextProvider>
      <Component {...pageProps} />
    </DataContextProvider>
  );
};

export default MyApp;
