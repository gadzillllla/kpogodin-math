import Exercise from 'components/Exercise';
import Header from 'components/Header';
import Result from 'components/Result';
import Settings from 'components/Settings';
import { useDispatch, useSelector } from 'react-redux';
import { incrementErrorStat, incrementStep, incrementSuccessStat } from 'state/gameSlice';
import { RootState } from 'state/store';

import s from './App.module.css';

function App() {
  const isStarted = useSelector((state: RootState) => state.game.isStarted);
  const dispatch = useDispatch();

  const step = useSelector((state: RootState) => state.game.step);
  const limit = useSelector((state: RootState) => state.game.limit);

  const onAnswer = (isCorrect: boolean): void => {
    if (isCorrect) {
      dispatch(incrementSuccessStat());
      dispatch(incrementStep());
    } else {
      dispatch(incrementErrorStat());
    }
  };

  const isStartScreenVisible = !isStarted && step === 1;
  const isResultScreenVisible = isStarted && step > limit;
  const isInGrogress = !isStartScreenVisible && !isResultScreenVisible;

  const getTitle = (): string => {
    if (isStartScreenVisible) return 'НАСТРОЙКИ';
    if (isResultScreenVisible) return 'РЕЗУЛЬТАТ';
    return `ПРИМЕР №${step}`;
  };

  return (
    <div style={{ height: `${document.documentElement.clientHeight}px` }} className={s.root}>
      <div style={{ height: `${document.documentElement.clientHeight - 100}px` }} className={s.container}>
        <Header title={getTitle()} />
        {isStartScreenVisible && <Settings />}
        {isInGrogress && <Exercise onAnswer={onAnswer} />}
        {isResultScreenVisible && <Result />}
      </div>
    </div>
  );
}

export default App;
