import cn from 'classnames';
import AnswerButtons from 'components/AnswerButtons';
import Header from 'components/Header';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { sounds } from 'services/audioService';
import ExerciseGenerator from 'services/exerciseGenerator';
import { RootState } from 'state/store';
import { ElementTypeEnum } from 'types/enums';
import { delay } from 'utils/delay';

import s from './Exercise.module.css';

enum StatusEnum {
  success = 'success',
  error = 'error',
  initial = 'initial',
}

export interface IExercisePropsType {
  onAnswer: (isCorrect: boolean) => void;
}

function Exercise(props: IExercisePropsType) {
  const { onAnswer } = props;

  const step = useSelector((state: RootState) => state.game.step);
  const difficulty = useSelector((state: RootState) => state.game.difficulty);
  const operators = useSelector((state: RootState) => state.game.operators);
  const limit = useSelector((state: RootState) => state.game.limit);
  const exercise = useMemo(() => new ExerciseGenerator(operators, difficulty).generateExercise(), [step]);
  const [userAnswer, setUserAnswer] = useState<number | null>(null);
  const [status, setStatus] = useState<StatusEnum>(StatusEnum.initial);

  useEffect(() => {
    const resetState = () => {
      setUserAnswer(null);
      setStatus(StatusEnum.initial);
    };

    const checkAnswer = async () => {
      await delay(500);
      if (exercise.answer === userAnswer) {
        setStatus(StatusEnum.success);
        sounds.success();
        await delay(2000);
        resetState();
        onAnswer(true);
      } else if (exercise.answer !== userAnswer) {
        setStatus(StatusEnum.error);
        sounds.error();
        await delay(2000);
        resetState();
        onAnswer(false);
      }
    };

    if (userAnswer) {
      checkAnswer();
    }
  }, [userAnswer]);

  const statusToElemtntType = (): ElementTypeEnum => {
    if (status === StatusEnum.success) return ElementTypeEnum.success;
    if (status === StatusEnum.error) return ElementTypeEnum.error;
    return ElementTypeEnum.primary;
  };

  return (
    <div className={cn(s.root, s[status])}>
      <Header type={statusToElemtntType()}>
        <h1>
          ПРИМЕР {step} / {limit}
        </h1>
      </Header>
      <div className={s.top}>
        <div className={cn(s.exercise, s[status])}>
          <span className={s.char}>{exercise.a}</span>
          <span className={s.char}>{exercise.operator}</span>
          <span className={s.char}>{exercise.b}</span>
          <span className={s.char}>=</span>
          <span className={s.char}>{userAnswer}</span>
        </div>
      </div>
      <div className={s.buttons}>
        <AnswerButtons type={statusToElemtntType()} disabled={!!userAnswer} onSelect={setUserAnswer} />
      </div>
    </div>
  );
}

export default Exercise;
