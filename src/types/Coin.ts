import type { Transaction } from './Transaction';

export interface Coin {
  id: string;
  symbol: string;
  name: string;
  price: string;
  transactions: Transaction[];
}
