import Button from 'components/Button';
import Header from 'components/Header';
import ResultStars from 'components/ResultStars';
import { IResultNumbers } from 'components/ResultStars/ResultStars';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { restart } from 'state/gameSlice';
import { RootState } from 'state/store';
import { ElementTypeEnum } from 'types/enums';

import s from './Result.module.css';

const Result = () => {
  const dispatch = useDispatch();
  const [, errors] = useSelector((state: RootState) => state.game.statistic);
  const limit = useSelector((state: RootState) => state.game.limit);

  const getResult = (): IResultNumbers => {
    if (!errors) return 3;
    if (errors < limit / 2) return 2;
    return 1;
  };
  return (
    <>
      <Header type={ElementTypeEnum.success}>
        <h1>РЕЗУЛЬТАТ</h1>
      </Header>{' '}
      <div className={s.root}>
        <section className={s.section}>
          <ResultStars result={getResult()} />
          <p className={s.title}>Всего ошибок: {errors}</p>
        </section>
        <Button type={ElementTypeEnum.success} className={s.restart} onClick={() => dispatch(restart())}>
          ЗАНОВО
        </Button>
      </div>
    </>
  );
};

export default Result;
