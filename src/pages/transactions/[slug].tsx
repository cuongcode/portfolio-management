import { useContext } from 'react';

import { BoardTransactions } from '@/components/pages-component/transaction-page';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import { DataContext } from '@/utils/data-context';

const TransactionPage = ({ query }: { query: any }) => {
  const { data, transactionAddHandle } = useContext(DataContext);
  const coin = data.find((item) => item.symbol === query.slug);
  return (
    <Main meta={<Meta title="Transaction" description="Lorem ipsum" />}>
      <BoardTransactions
        coin={coin}
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
