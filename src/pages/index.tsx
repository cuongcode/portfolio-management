import { Board } from '@/components/pages-component/home-page';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const HomePage = () => {
  return (
    <>
      <Main meta={<Meta title="Portfolio" description="Portfolio" />}>
        <div className="px-5">
          {/* test fetch */}
          {/* <AddTokenForm onFormSubmit={onAddToken} /> */}
          <Board />
        </div>
      </Main>
      <div id="portal" />
    </>
  );
};

export default HomePage;
