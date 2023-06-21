export interface Transaction {
  id: string;
  price: number;
  quantity: number;
  date: Date;
  fees: number;
  notes: string;
  buy: boolean;
  avgNetCost: number;
}
