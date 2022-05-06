import Button from 'components/Button';
import React from 'react';

import s from './AnswerButtons.module.css';

const BUTTONS_COUNT = 20;
const arrayFromButtonsCount = Array.from(new Array(BUTTONS_COUNT), () => '');

export interface IAnswerButtonsPropsType {
  onSelect: (value: number) => void;
  disabled: boolean;
}

const AnswerButtons = (props: IAnswerButtonsPropsType) => {
  const { onSelect, disabled } = props;

  return (
    <div className={s.root}>
      {arrayFromButtonsCount.map((item, index) => {
        const value = index + 1;

        return (
          <Button
            className={s.button}
            key={value}
            onClick={() => {
              if (!disabled) {
                onSelect(value);
              }
            }}
          >
            {value}
          </Button>
        );
      })}
    </div>
  );
};

export default AnswerButtons;
