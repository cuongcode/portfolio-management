import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TextInput } from '@/components/base';
import { DataActions, selector, UserActions } from '@/redux';
import type { Coin } from '@/types/Coin';
import type { User } from '@/types/User';

const { v4: uuidv4 } = require('uuid');

export const AddTransactionForm = ({
  coin,
  holdings,
  avgNetCost,
  onClose,
}: {
  coin: Coin;
  holdings: number;
  avgNetCost: number;
  onClose: () => void;
}) => {
  const { currentData } = useSelector(selector.data);
  const { currentUser, allUser } = useSelector(selector.user);

  const [form, setForm] = useState<any>({});
  const [errors, setErrors] = useState<any>({});
  const [action, setAction] = useState<any>('buy');

  const dispatch = useDispatch();

  const _validateForm = () => {
    const errorObject: any = {};
    if (!form.price) {
      errorObject.price = 'Please input price';
    } else if (form.price <= 0) {
      errorObject.price = 'Price must be greater than 0';
    }
    if (!form.quantity) {
      errorObject.quantity = 'Please input quantity';
    } else if (form.quantity <= 0) {
      errorObject.quantity = 'Quantity must be greater than 0';
    }
    if (!form.date) {
      errorObject.date = 'Please input date';
    }

    setErrors(errorObject);
    if (Object.keys(errorObject).length > 0) return false;
    return true;
  };

  const _addTransaction = () => {
    if (!_validateForm()) return;
    const body = {
      price: Number(form.price),
      quantity:
        action === 'buy' ? Number(form.quantity) : Number(form.quantity) * -1,
      date: form.date,
      fees: Number(form.fees),
      notes: form.notes,
      id: uuidv4(),
      buy: action === 'buy',
      avgNetCost,
    };

    const updatedTransactions = [...coin.transactions, body];
    const updatedCoin = { ...coin, transactions: updatedTransactions };
    const updatedCurrentData = currentData.map((item: Coin) => {
      if (item.id === updatedCoin.id) {
        return updatedCoin;
      }
      return item;
    });

    const updatedCurrentUser = { ...currentUser, data: updatedCurrentData };
    const updatedAlluser = allUser.map((user: User) => {
      if (user.id === updatedCurrentUser.id) {
        return updatedCurrentUser;
      }
      return user;
    });
    dispatch(UserActions.setCurrentUser(updatedCurrentUser));
    dispatch(UserActions.setAllUser(updatedAlluser));
    dispatch(DataActions.setCurrentData(updatedCurrentData));

    setForm({});
    setErrors({});
  };

  const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setForm((prev: any) => ({ ...prev, [name]: value }));
    setErrors((prev: any) => ({ ...prev, [name]: '' }));
  };

  const _onMaxClick = () => {
    setForm((prev: any) => ({ ...prev, quantity: holdings }));
  };

  return (
    <>
      <h2 className="mb-4 text-3xl">Add transaction</h2>
      <div className="mb-4 flex justify-between border-b-2 text-center font-bold">
        <button
          type="button"
          className={`grow p-2 ${
            action === 'buy' ? 'border-b-4 border-b-green-500' : ''
          } `}
          onClick={() => setAction('buy')}
        >
          Buy
        </button>
        <button
          type="button"
          className={`grow p-2 ${
            action === 'sell' ? 'border-b-4 border-b-red-500' : ''
          } `}
          onClick={() => setAction('sell')}
        >
          Sell
        </button>
      </div>
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
        <div className="relative">
          <TextInput
            title="Quantity"
            type="number"
            name="quantity"
            placeholder="1"
            value={form.quantity}
            error={errors.quantity}
            onChange={_onChange}
          />
          {action === 'sell' && (
            <>
              <div className="absolute right-0 top-0 text-sm">
                {' '}
                Balance: {holdings} {coin.symbol.toUpperCase()}
              </div>
              <div className="absolute right-2 top-9 flex text-sm">
                <button
                  type="button"
                  className="mr-2 rounded-md bg-green-400 px-2"
                  onClick={_onMaxClick}
                >
                  MAX
                </button>
                <div className="font-bold">{coin.symbol.toUpperCase()}</div>
              </div>
            </>
          )}
        </div>

        <TextInput
          title={action === 'buy' ? 'Total Spent' : 'Total Received'}
          type="text"
          name="total-spent"
          value={(form.price * form.quantity).toFixed(3)}
          placeholder="USD"
          className="rounded-md bg-gray-400 p-2"
          disabled
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
            onClick={onClose}
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
