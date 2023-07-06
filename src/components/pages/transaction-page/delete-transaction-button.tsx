import { TrashIcon } from '@heroicons/react/outline';
import { useDispatch, useSelector } from 'react-redux';

import { DataActions, selector, UserActions } from '@/redux';

export const DeleteTransactionButton = ({
  coin,
  transaction,
}: {
  coin: any;
  transaction: any;
}) => {
  const { currentUser, allUser } = useSelector(selector.user);
  const { currentData } = useSelector(selector.data);

  const dispatch = useDispatch();

  const _onTransactionDelete = () => {
    const updatedTransactions = coin.transactions.filter(
      (item: any) => item.id !== transaction.id
    );
    const updatedCoin = { ...coin, transactions: updatedTransactions };
    const updatedCurrentData = currentData.map((item: any) => {
      if (item.id === updatedCoin.id) {
        return updatedCoin;
      }
      return item;
    });

    const updatedCurrentUser = { ...currentUser, data: updatedCurrentData };
    const updatedAlluser = allUser.map((user: any) => {
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
