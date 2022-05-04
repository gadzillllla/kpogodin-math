import cn from 'classnames';
import React from 'react';

import s from './StatisticChart.module.css';

export interface IStatisticChartPropsType {
  corrects: number;
  errors: number;
}

const StatisticChart = (props: IStatisticChartPropsType) => {
  const { corrects, errors } = props;
  const hasResult = !!corrects || !!errors;
  const summ = corrects + errors;
  const percentOfCorrect = summ > 0 ? Math.round((corrects / summ) * 100) : 0;

  return (
    <div className={s.root}>
      <div className={s.progress}>
        <div className={cn(s.container, { [s.error]: hasResult })}>
          <div className={s.success} style={{ width: `${percentOfCorrect}%` }} />
        </div>
        <small>{percentOfCorrect}%</small>
      </div>
    </div>
  );
};

export default StatisticChart;
