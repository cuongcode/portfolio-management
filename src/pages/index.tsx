import { Board } from '@/components/pages-component/home-page';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const HomePage = () => {
  return (
    <>
      <Main meta={<Meta title="Portfolio" description="Portfolio" />}>
        <Board />
      </Main>
      <div id="portal" />
    </>
  );
};

export default HomePage;
