import { useSelector } from 'react-redux';

import { PieChart } from '@/components/chart/PieChart';
import { Board } from '@/components/pages/home-page';
import { Meta } from '@/layouts/Meta';
import { selector } from '@/redux';
import { Main } from '@/templates/Main';
import type { User } from '@/types/User';

const HomePage = () => {
  const { allUser } = useSelector(selector.user);
  return (
    <>
      <Main meta={<Meta title="Portfolio" description="Portfolio" />}>
        <div className="flex flex-col gap-2">
          {allUser?.map((item: User) => (
            <div key={item.id} className="flex gap-2">
              <div>username: {item.username}</div>
              <div>password: {item.password}</div>
              <div>fisrtname: {item.profile.firstname}</div>
              <div>lastname: {item.profile.lastname}</div>
            </div>
          ))}
        </div>
        <PieChart />
        <Board />
      </Main>
      <div id="portal" />
    </>
  );
};

export default HomePage;
