import { TrashIcon } from '@heroicons/react/outline';
import { useDispatch, useSelector } from 'react-redux';

import { DataActions, selector, UserActions } from '@/redux';
import type { Coin } from '@/types/Coin';
import type { Transaction } from '@/types/Transaction';
import type { User } from '@/types/User';

export const DeleteTransactionButton = ({
  coin,
  transaction,
}: {
  coin: Coin;
  transaction: Transaction;
}) => {
  const { currentUser, allUser } = useSelector(selector.user);
  const { currentData } = useSelector(selector.data);

  const dispatch = useDispatch();

  const _onTransactionDelete = () => {
    const updatedTransactions = coin?.transactions.filter(
      (item: Transaction) => item.id !== transaction.id
    );
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
  };

  return (
    <div>
      <button
        onClick={() => _onTransactionDelete()}
        type="button"
        className="w-fit"
      >
        <TrashIcon className="w-4" />
      </button>
    </div>
  );
};
