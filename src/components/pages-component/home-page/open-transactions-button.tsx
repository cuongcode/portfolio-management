import { ChevronRightIcon } from '@heroicons/react/outline';

export const OpenTransactionsButton = ({
  onOpenTransactions,
}: {
  onOpenTransactions: () => void;
}) => {
  return (
    <button type="button" className="" onClick={onOpenTransactions}>
      <ChevronRightIcon className="w-4" />
    </button>
  );
};
