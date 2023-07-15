import React from 'react';

import { PieChart } from '@/components/chart/PieChart';
import { Board } from '@/components/pages/home-page';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

export const HomePage = () => {
  return (
    <>
      <Main meta={<Meta title="Portfolio" description="Portfolio" />}>
        <PieChart />
        <Board />
      </Main>
      <div id="portal" />
    </>
  );
};

export default HomePage;
