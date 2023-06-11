import type { ReactNode } from 'react';
import React, { createContext, useState } from 'react';

interface Transaction {
  //
}

interface Coin {
  id: string;
  symbol: string;
  name: string;
  price: string;
  transaction: Transaction[];
}

export const DataContext = createContext<Coin[]>([]);

export const DataContextProvider = ({ children }: { children: ReactNode }) => {
  const [data] = useState<Coin[]>([
    {
      id: '1',
      symbol: 'btc',
      name: 'bitcoin',
      price: '2323',
      transaction: [1, 2, 3],
    },
  ]);

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};
