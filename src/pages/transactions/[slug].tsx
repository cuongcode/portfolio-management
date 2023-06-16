import { useContext } from 'react';

import { BoardTransactions } from '@/components/pages-component/transaction-page';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import { DataContext } from '@/utils/data-context';

const TransactionPage = ({ query }: { query: any }) => {
  const {
    data,
    PNL_List,
    holdingsList,
    totalCostList,
    avgNetCostList,
    holdingsValueList,
    transactionAddHandle,
  } = useContext(DataContext);
  const coin = data.find((item) => item.symbol === query.slug);

  const holdings =
    holdingsList[data.findIndex((item) => item.symbol === query.slug)];

  const totalCost =
    totalCostList[data.findIndex((item) => item.symbol === query.slug)];

  const avgNetCost =
    avgNetCostList[data.findIndex((item) => item.symbol === query.slug)];

  const holdingsValue =
    holdingsValueList[data.findIndex((item) => item.symbol === query.slug)];

  const PNL = PNL_List[data.findIndex((item) => item.symbol === query.slug)];

  return (
    <Main meta={<Meta title="Transaction" description="Lorem ipsum" />}>
      <BoardTransactions
        coin={coin}
        holdings={holdings}
        totalCost={totalCost}
        avgNetCost={avgNetCost}
        holdingsValue={holdingsValue}
        PNL={PNL}
        transactionAddHandle={transactionAddHandle}
      />
    </Main>
  );
};

export default TransactionPage;

TransactionPage.getInitialProps = async (context: any) => {
  const { query } = context;
  return { query };
};
