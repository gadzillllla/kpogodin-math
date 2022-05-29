import Button from 'components/Button';
import React from 'react';
import { ElementTypeEnum } from 'types/enums';

import s from './AnswerButtons.module.css';

const BUTTONS_COUNT = 20;
const arrayFromButtonsCount = Array.from(new Array(BUTTONS_COUNT), () => '');

export interface IAnswerButtonsPropsType {
  onSelect: (value: number) => void;
  disabled: boolean;
  type?: ElementTypeEnum;
}

const AnswerButtons = (props: IAnswerButtonsPropsType) => {
  const { onSelect, disabled, type = ElementTypeEnum.default } = props;

  return (
    <div className={s.root}>
      {arrayFromButtonsCount.map((item, index) => {
        const value = index + 1;

        return (
          <Button
            className={s.button}
            type={type}
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
