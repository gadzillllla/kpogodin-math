import cn from 'classnames';
import AnswerButtons from 'components/AnswerButtons';
import React, { useEffect, useMemo, useState } from 'react';
import ExerciseGenerator, { OperatorsEnum } from 'servises/exerciseGenerator';
import { delay } from 'utils/delay';

import s from './Exercise.module.css';

enum StatusEnum {
  success = 'success',
  error = 'error',
  initial = 'initial',
}

export interface IExercisePropsType {
  onNext: () => void;
  step: number;
}

function Exercise(props: IExercisePropsType) {
  const { onNext, step } = props;
  const exercise = useMemo(() => new ExerciseGenerator(OperatorsEnum.plus, 10).generateExercise(), [step]);
  const [userAnswer, setUserAnswer] = useState<number | null>(null);
  const [status, setStatus] = useState<StatusEnum>(StatusEnum.initial);

  useEffect(() => {
    const resetState = () => {
      setUserAnswer(null);
      setStatus(StatusEnum.initial);
    };

    const onAnswer = async () => {
      if (exercise.answer === userAnswer) {
        setStatus(StatusEnum.success);
        await delay(2000);
        resetState();
        onNext();
      } else if (exercise.answer !== userAnswer) {
        setStatus(StatusEnum.error);
        await delay(2000);
        resetState();
      }
    };

    if (userAnswer) {
      onAnswer();
    }
  });

  return (
    <div className={cn(s.root, s[status])}>
      {exercise.task.map((char) => (
        <span className={s.char}>{char}</span>
      ))}
      <span className={s.char}>=</span>
      <span className={s.char}>{userAnswer}</span>
      <AnswerButtons onSelect={setUserAnswer} />
    </div>
  );
}

export default Exercise;
