import React from 'react';

import s from './AnswerButtons.module.css';

const BUTTONS_COUNT = 20;
const arrayFromButtonsCount = Array.from(new Array(BUTTONS_COUNT), () => '');

export interface IAnswerButtonsPropsType {
  onSelect: (value: number) => void;
}

const AnswerButtons = (props: IAnswerButtonsPropsType) => {
  const { onSelect } = props;
  console.log('asdasd');

  return (
    <div className={s.root}>
      {arrayFromButtonsCount.map((item, index) => {
        const value = index + 1;
        console.log(value);

        return (
          <button className={s.button} key={value} onClick={() => onSelect(value)}>
            {value}
          </button>
        );
      })}
    </div>
  );
};

export default AnswerButtons;
