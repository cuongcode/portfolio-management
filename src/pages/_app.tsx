import '../styles/global.css';

import { DataProvider } from 'context/data-context';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Redux from '../redux';

const { store, persistor } = Redux();

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <DataProvider>
          <Component {...pageProps} />
        </DataProvider>
      </PersistGate>
    </Provider>
  );
};

export default MyApp;
