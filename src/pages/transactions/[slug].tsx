import { BoardTransactions } from '@/components/pages-component/transaction-page';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const TransactionPage = ({ query }: { query: any }) => {
  return (
    <Main meta={<Meta title="Transaction" description="Lorem ipsum" />}>
      <BoardTransactions symbol={query.slug} />
    </Main>
  );
};

export default TransactionPage;

TransactionPage.getInitialProps = async (context: any) => {
  const { query } = context;
  return { query };
};
