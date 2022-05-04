import Button from 'components/Button';
import { ButtonTypeEnum } from 'components/Button/Button';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OperatorsEnum } from 'servises/exerciseGenerator';
import { selectOperators, startGame } from 'state/gameSlice';
import { RootState } from 'state/store';

import s from './Settings.module.css';

export interface ISettingsPropsType {}

const Settings = () => {
  const dispatch = useDispatch();
  const operators = useSelector((state: RootState) => state.game.operators);

  const toggleOperator = (targetOperator: OperatorsEnum) => {
    const isSelectedOperatorNow = operators.includes(targetOperator);
    if (isSelectedOperatorNow) {
      dispatch(selectOperators(operators.filter((item) => item !== targetOperator)));
    } else {
      dispatch(selectOperators([...operators, targetOperator]));
    }
  };

  const getOperatorButtonType = (targetOperator: OperatorsEnum): ButtonTypeEnum => {
    return operators.includes(targetOperator) ? ButtonTypeEnum.success : ButtonTypeEnum.inactive;
  };

  return (
    <div className={s.root}>
      <section className={s.section}>
        <h1 className={s.title}>ОПЕРАТОРЫ</h1>
        <div className={s.buttons}>
          <Button type={getOperatorButtonType(OperatorsEnum.plus)} onClick={() => toggleOperator(OperatorsEnum.plus)}>
            +
          </Button>
          <Button type={getOperatorButtonType(OperatorsEnum.minus)} onClick={() => toggleOperator(OperatorsEnum.minus)}>
            –
          </Button>
        </div>
      </section>
      <section className={s.section}>
        <Button
          disabled={!operators.length}
          className={s.start}
          type={ButtonTypeEnum.success}
          onClick={() => dispatch(startGame())}
        >
          СТАРТ
        </Button>
      </section>
    </div>
  );
};

export default Settings;
