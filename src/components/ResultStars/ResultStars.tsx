import { ReactComponent as Star } from 'images/star.svg';
import React, { CSSProperties } from 'react';
import { repeatSound, sounds } from 'services/audioService';

import s from './ResultStars.module.css';

export type IResultNumbers = 1 | 2 | 3;

export interface IResultStarsPropsType {
  result: IResultNumbers;
}

const ResultStars = (props: IResultStarsPropsType) => {
  const { result } = props;
  const arrayForRenderEmptyStars = Array.from(new Array(3));
  repeatSound(result, 300, sounds.blob);

  return (
    <div className={s.root}>
      {arrayForRenderEmptyStars.map((elem, i) => {
        const hasResultStar = i + 1 <= result;
        // @ts-ignore
        const style: CSSProperties = { '--delay': `${(i + 1) / 3}s` };
        return (
          <div className={s.starContainer}>
            <Star className={s.emptyStar} width={90} height={90} />
            {hasResultStar && <Star className={s.star} style={style} width={90} height={90} />}
          </div>
        );
      })}
    </div>
  );
};

export default ResultStars;
