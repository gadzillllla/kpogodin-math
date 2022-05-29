import cn from 'classnames';
import Button from 'components/Button';
import Header from 'components/Header';
import React, { ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OperatorsEnum } from 'services/exerciseGenerator';
import { selectOperators, setDifficulty, setLimit, startGame } from 'state/gameSlice';
import { RootState } from 'state/store';
import { ElementTypeEnum } from 'types/enums';

import s from './Settings.module.css';

export interface ISettingsPropsType {}

const DIFFICULTY_VALUES = [3, 5, 7, 10];
const LIMIT_VALUES = [5, 10, 20, 30];

const Settings = () => {
  const dispatch = useDispatch();
  const operators = useSelector((state: RootState) => state.game.operators);
  const difficulty = useSelector((state: RootState) => state.game.difficulty);
  const limit = useSelector((state: RootState) => state.game.limit);

  const toggleOperator = (targetOperator: OperatorsEnum) => {
    const isSelectedOperatorNow = operators.includes(targetOperator);
    if (isSelectedOperatorNow) {
      dispatch(selectOperators(operators.filter((item) => item !== targetOperator)));
    } else {
      dispatch(selectOperators([...operators, targetOperator]));
    }
  };

  const isPlusActive = operators.includes(OperatorsEnum.plus);
  const isMinusActive = operators.includes(OperatorsEnum.minus);

  const plusBtn = (
    <Button
      className={s.button}
      type={isPlusActive ? ElementTypeEnum.success : ElementTypeEnum.inactive}
      onClick={() => toggleOperator(OperatorsEnum.plus)}
    >
      +
    </Button>
  );

  const minusBtn = (
    <Button
      className={s.button}
      type={isMinusActive ? ElementTypeEnum.success : ElementTypeEnum.inactive}
      onClick={() => toggleOperator(OperatorsEnum.minus)}
    >
      –
    </Button>
  );

  const renderToggle = (btn: ReactNode, isActive: boolean, message: string) => {
    return (
      <div className={s.toggle}>
        {btn}
        <span className={cn(s.description, { [s.active]: isActive })}>
          {message} <br />
          {isActive ? 'включены' : 'отключены'}
        </span>
      </div>
    );
  };

  const renderDifficultyButton = (value: number) => (
    <Button
      className={s.button}
      type={difficulty === value ? ElementTypeEnum.success : ElementTypeEnum.inactive}
      onClick={() => dispatch(setDifficulty(value))}
    >
      {value}
    </Button>
  );

  const renderLimitButton = (value: number) => (
    <Button
      className={s.button}
      type={limit === value ? ElementTypeEnum.success : ElementTypeEnum.inactive}
      onClick={() => dispatch(setLimit(value))}
    >
      {value}
    </Button>
  );

  return (
    <>
      <Header type={ElementTypeEnum.error}>
        <h1>НАСТРОЙКИ</h1>
      </Header>
      <div className={s.root}>
        <section className={s.section}>
          <span>Операторы</span>
          {renderToggle(plusBtn, isPlusActive, 'Примеры на сложение')}
          {renderToggle(minusBtn, isMinusActive, 'Примеры на вычитание')}
        </section>
        <section className={s.section}>
          <span>Сложность (числа до {difficulty})</span>
          <div className={s.row}>{DIFFICULTY_VALUES.map(renderDifficultyButton)}</div>
        </section>
        <section className={s.section}>
          <span>Количество примеров</span>
          <div className={s.row}>{LIMIT_VALUES.map(renderLimitButton)}</div>
        </section>
        <section className={s.centered}>
          <Button
            disabled={!operators.length}
            className={s.start}
            type={ElementTypeEnum.success}
            onClick={() => dispatch(startGame())}
          >
            СТАРТ
          </Button>
        </section>
      </div>
    </>
  );
};

export default Settings;
