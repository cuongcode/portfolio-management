import { BoardTransactions } from '@/components/pages-component/transaction-page';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const TransactionPage = () => (
  <Main meta={<Meta title="Transaction" description="Lorem ipsum" />}>
    <BoardTransactions />
  </Main>
);

export default TransactionPage;
