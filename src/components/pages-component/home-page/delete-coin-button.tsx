import { TrashIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DataActions, selector } from '@/redux';

import { DeleteCoinForm } from './form-delete-coin';
import { ModalCenter } from './modal-center';

export const DeleteCoinButton = ({ deletedCoin }: { deletedCoin: any }) => {
  const { currentData } = useSelector(selector.data);
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const _onDeleteCoin = () => {
    const updatedCurrentData = currentData.filter(
      (item: any) => item.symbol !== deletedCoin.symbol
    );
    dispatch(DataActions.setCurrentData(updatedCurrentData));
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
