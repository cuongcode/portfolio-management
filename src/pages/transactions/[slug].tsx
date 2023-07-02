import { useSelector } from 'react-redux';

import { BoardTransactions } from '@/components/pages-component/transaction-page';
import { Meta } from '@/layouts/Meta';
import { selector } from '@/redux';
import { Main } from '@/templates/Main';
import { sumOfNumberArray, zipArray } from '@/utils/base';

const TransactionPage = ({ query }: { query: any }) => {
  const { currentData } = useSelector(selector.data);

  const currentPriceList = currentData.map((item: any) => item.price);

  const totalCostList = currentData.map((item: any) => {
    return sumOfNumberArray(
      item?.transactions.map((trans: any) => {
        if (trans.buy) {
          return trans.price * trans.quantity;
        }
        return trans.avgNetCost * trans.quantity;
      })
    );
  });

  const holdingsList = currentData.map((item: any) => {
    if (item?.transactions.length === 0) {
      return 0;
    }
    return sumOfNumberArray(
      item?.transactions.map((trans: any) => trans.quantity)
    );
  });

  const avgNetCostList = zipArray(totalCostList, holdingsList, (a, b) => a / b);

  const holdingsValueList = zipArray(
    currentPriceList,
    holdingsList,
    (a, b) => a * b
  );

  const PNL_List = zipArray(holdingsValueList, totalCostList, (a, b) => a - b);

  const index = currentData.findIndex(
    (item: any) => item.symbol === query.slug
  );

  const coin = currentData[index];
  const holdings = holdingsList[index];
  const totalCost = totalCostList[index];
  const avgNetCost = avgNetCostList[index];
  const holdingsValue = holdingsValueList[index];
  const PNL = PNL_List[index];

  return (
    <Main meta={<Meta title="Transaction" description="Lorem ipsum" />}>
      <BoardTransactions
        coin={coin}
        holdings={holdings}
        totalCost={totalCost}
        avgNetCost={avgNetCost}
        holdingsValue={holdingsValue}
        PNL={PNL}
      />
    </Main>
  );
};

export default TransactionPage;

TransactionPage.getInitialProps = async (context: any) => {
  const { query } = context;
  return { query };
};
