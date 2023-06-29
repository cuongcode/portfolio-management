import { useSelector } from 'react-redux';

import { Board } from '@/components/pages-component/home-page';
import { Meta } from '@/layouts/Meta';
import { selector } from '@/redux';
import { Main } from '@/templates/Main';
import type { User } from '@/types/User';

const HomePage = () => {
  const { allUser } = useSelector(selector.user);

  return (
    <>
      <Main meta={<Meta title="Portfolio" description="Portfolio" />}>
        <div>
          {allUser?.map((item: User) => (
            <div key={item.username} className="flex gap-2">
              <div>username: {item.username}</div>
              <div>password: {item.password}</div>
            </div>
          ))}
        </div>
        <Board />
      </Main>
      <div id="portal" />
    </>
  );
};

export default HomePage;
