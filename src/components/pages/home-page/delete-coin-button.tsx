import { TrashIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DataActions, selector, UserActions } from '@/redux';
import type { Coin } from '@/types/Coin';
import type { User } from '@/types/User';

import { DeleteCoinForm } from './form-delete-coin';
import { ModalCenter } from './modal-center';

export const DeleteCoinButton = ({ deletedCoin }: { deletedCoin: Coin }) => {
  const { currentUser, allUser } = useSelector(selector.user);
  const { currentData } = useSelector(selector.data);
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const _onDeleteCoin = () => {
    const updatedCurrentData = currentData.filter(
      (item: Coin) => item.symbol !== deletedCoin.symbol
    );

    const updatedCurrentUser = { ...currentUser, data: updatedCurrentData };
    const updatedAlluser = allUser.map((user: User) => {
      if (user.id === updatedCurrentUser.id) {
        return updatedCurrentUser;
      }
      return user;
    });

    dispatch(DataActions.setCurrentData(updatedCurrentData));
    dispatch(UserActions.setCurrentUser(updatedCurrentUser));
    dispatch(UserActions.setAllUser(updatedAlluser));
  };

  return (
    <div>
      <button type="button" onClick={() => setIsOpen(true)}>
        <TrashIcon className="w-4" />
      </button>
      {isOpen ? (
        <ModalCenter open={isOpen} onClose={() => setIsOpen(false)}>
          <DeleteCoinForm
            onDeleteCoin={_onDeleteCoin}
            onClose={() => setIsOpen(false)}
          />
        </ModalCenter>
      ) : null}
    </div>
  );
};
