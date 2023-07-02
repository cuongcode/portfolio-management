import { ChevronRightIcon } from '@heroicons/react/outline';
import Router from 'next/router';

export const OpenTransactionsButton = ({ coin }: { coin: any }) => {
  const onOpenTransactions = () => {
    Router.push(`/transactions/${coin.symbol}`);
  };

  return (
    <button type="button" className="" onClick={onOpenTransactions}>
      <ChevronRightIcon className="w-4" />
    </button>
  );
};
