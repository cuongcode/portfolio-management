import { useState } from 'react';

import type { Coin } from '@/types/Coin';
import type { Transaction } from '@/types/Transaction';

export const AddTransactionForm = ({
  transactionAdd,
  coin,
}: {
  transactionAdd: (coin: Coin, transaction: Transaction) => void;
  coin: Coin;
}) => {
  const [form, setForm] = useState<any>({});
  const [errors, setErrors] = useState<any>({});

  const _validateForm = () => {
    const errorObject: any = {};
    if (!form.price || form.price <= 0) {
      errorObject.price = 'Pls input price';
    }

    setErrors(errorObject);
    if (Object.keys(errorObject).length > 0) return false;
    return true;
  };

  const _addTransaction = () => {
    if (!_validateForm()) return;
    const body = {
      price: Number(form.price),
      quantity: Number(form.quantity),
      date: form.date,
      fees: Number(form.fees),
      notes: form.notes,
      id: coin.transactions.length + 1,
    };
    transactionAdd(coin, body);
    setForm({});
    setErrors({});
  };

  const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setForm((current: any) => ({ ...current, [name]: value }));
    setErrors((current: any) => ({ ...current, [name]: '' }));
  };

  return (
    <>
      <h2 className="mb-4 text-3xl">Add transaction</h2>
      <div className="flex flex-col text-base">
        <TextInput
          title="Price Per Coin"
          type="number"
          name="price"
          placeholder="USD"
          value={form.price}
          error={errors.price}
          onChange={_onChange}
        />
        <TextInput
          title="Quantity"
          type="number"
          name="quantity"
          placeholder="1"
          value={form.quantity}
          error={errors.quantity}
          onChange={_onChange}
        />
        <TextInput
          title="Total Spent"
          type="text"
          name="quantity"
          placeholder="USD"
        />
        <TextInput
          title="Date"
          type="datetime-local"
          name="date"
          value={form.date}
          error={errors.date}
          onChange={_onChange}
        />
        <TextInput
          title="Fees (Optional)"
          type="number"
          placeholder="USD"
          name="fees"
          value={form.fees}
          error={errors.fees}
          onChange={_onChange}
        />
        <TextInput
          title="Notes (Optional)"
          type="text"
          placeholder="Optional"
          name="notes"
          value={form.notes}
          error={errors.notes}
          onChange={_onChange}
        />

        <div className="flex justify-between space-x-2">
          <button
            className="grow rounded-md border-2 p-2"
            type="submit"
            disabled
          >
            Cancel
          </button>
          <button
            onClick={_addTransaction}
            type="submit"
            className="grow rounded-md bg-green-500 p-2"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
  error?: string;
}
const TextInput = ({ title, error, ...rest }: TextInputProps) => {
  return (
    <div className="mb-4 flex flex-col">
      <div className="font-bold">{title}</div>
      <input
        className="rounded-md border-2 p-2"
        type="number"
        placeholder="1"
        {...rest}
      />
      <div className="text-red-500">{error}</div>
    </div>
  );
};

// ADVANCDE FORM : useCallback , useMemo
