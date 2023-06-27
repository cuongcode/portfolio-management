import { useDispatch, useSelector } from 'react-redux';

import { Board } from '@/components/pages-component/home-page';
import { Meta } from '@/layouts/Meta';
import { selector, UserActions } from '@/redux';
import { Main } from '@/templates/Main';

const HomePage = () => {
  const { currentUserInfo } = useSelector(selector.user);
  const dispatch = useDispatch();

  const _test = () => {
    dispatch(
      UserActions.setCurrentUserInfo({
        name: 'test',
        random: Math.random(),
      })
    );
  };

  return (
    <>
      <Main meta={<Meta title="Portfolio" description="Portfolio" />}>
        <button onClick={_test}>TEST</button>
        <div>
          {currentUserInfo?.name} : {currentUserInfo?.random}
        </div>
        <Board />
      </Main>
      <div id="portal" />
    </>
  );
};

export default HomePage;
