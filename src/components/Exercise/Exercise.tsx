import cn from 'classnames';
import AnswerButtons from 'components/AnswerButtons';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import ExerciseGenerator from 'servises/exerciseGenerator';
import { RootState } from 'state/store';
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
  const operators = useSelector((state: RootState) => state.game.operators);
  const exercise = useMemo(() => new ExerciseGenerator(operators, 10).generateExercise(), [step]);
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
        await delay(2000);
        resetState();
        onAnswer(true);
      } else if (exercise.answer !== userAnswer) {
        setStatus(StatusEnum.error);
        await delay(2000);
        resetState();
        onAnswer(false);
      }
    };

    if (userAnswer) {
      checkAnswer();
    }
  }, [userAnswer]);

  return (
    <div className={cn(s.root, s[status])}>
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
        <AnswerButtons onSelect={setUserAnswer} />
      </div>
    </div>
  );
}

export default Exercise;
