import { useContext } from 'react';
import { useSelector } from 'react-redux';

import { BoardTransactions } from '@/components/pages-component/transaction-page';
import { Meta } from '@/layouts/Meta';
import { selector } from '@/redux';
import { Main } from '@/templates/Main';
import { DataContext } from '@/utils/data-context';

const TransactionPage = ({ query }: { query: any }) => {
  const { currentData } = useSelector(selector.data);

  const {
    avgNetCostList,
    holdingsValueList,
    holdingsList,
    PNL_List,
    totalCostList,
  } = useContext(DataContext);

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
