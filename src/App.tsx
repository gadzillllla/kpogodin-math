import Exercise from 'components/Exercise';
import Result from 'components/Result';
import Settings from 'components/Settings';
import { useDispatch, useSelector } from 'react-redux';
import { incrementErrorStat, incrementStep, incrementSuccessStat } from 'state/gameSlice';
import { RootState } from 'state/store';

import s from './App.module.css';

enum GameStatesEnum {
  initial = 'initial',
  inProgress = 'inProgress',
  result = 'result',
}

function App() {
  const isStarted = useSelector((state: RootState) => state.game.isStarted);
  const dispatch = useDispatch();

  const step = useSelector((state: RootState) => state.game.step);
  const limit = useSelector((state: RootState) => state.game.limit);

  const getGameState = (): GameStatesEnum => {
    if (!isStarted && step === 1) return GameStatesEnum.initial;
    if (isStarted && step > limit) return GameStatesEnum.result;
    return GameStatesEnum.inProgress;
  };

  const onAnswer = (isCorrect: boolean): void => {
    if (isCorrect) {
      dispatch(incrementSuccessStat());
      dispatch(incrementStep());
    } else {
      dispatch(incrementErrorStat());
    }
  };

  const getContentByGameState = (): React.ReactNode => {
    switch (getGameState()) {
      case GameStatesEnum.initial:
        return <Settings />;
      case GameStatesEnum.result:
        return <Result />;
      default:
        return <Exercise onAnswer={onAnswer} />;
    }
  };

  return (
    <div style={{ height: `${document.documentElement.clientHeight}px` }} className={s.root}>
      <div style={{ height: `${document.documentElement.clientHeight - 100}px` }} className={s.container}>
        {getContentByGameState()}
      </div>
    </div>
  );
}

export default App;
