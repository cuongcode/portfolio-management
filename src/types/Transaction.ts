export interface Transaction {
  id: number;
  price: number;
  quantity: number;
  date: Date;
  fees: number;
  notes: string;
}
