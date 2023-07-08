import { CheckIcon } from '@heroicons/react/outline';

export const SelectPortfolioButton = ({
  name,
  currentPortfolio,
}: {
  name: any;
  currentPortfolio: any;
}) => {
  return (
    <div className="flex justify-between py-1 text-gray-700 hover:bg-gray-100 hover:text-gray-900">
      <button type="button" className=" flex items-center ">
        {name}
      </button>
      {name === currentPortfolio ? (
        <CheckIcon className="w-5 text-green-600" />
      ) : null}
    </div>
  );
};
