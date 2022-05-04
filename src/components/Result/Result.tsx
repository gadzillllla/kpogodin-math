import Button from 'components/Button';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { restart } from 'state/gameSlice';
import { RootState } from 'state/store';

import s from './Result.module.css';

const Result = () => {
  const dispatch = useDispatch();
  const [, errors] = useSelector((state: RootState) => state.game.statistic);

  return (
    <div className={s.root}>
      <section className={s.section}>
        <h1 className={s.title}>Всего ошибок: {errors}</h1>
      </section>
      <section className={s.section}>
        <Button className={s.restart} onClick={() => dispatch(restart())}>
          ЗАНОВО
        </Button>
      </section>
    </div>
  );
};

export default Result;
