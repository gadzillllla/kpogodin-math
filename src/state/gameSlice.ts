import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OperatorsEnum } from 'services/exerciseGenerator';

export interface IGameState {
  step: number;
  limit: number;
  difficulty: number;
  isStarted: boolean;
  operators: OperatorsEnum[];
  statistic: [number, number];
}

const initialState: IGameState = {
  step: 1,
  limit: 10,
  difficulty: 5,
  isStarted: false,
  operators: [OperatorsEnum.plus, OperatorsEnum.minus],
  statistic: [0, 0],
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    incrementStep: (state) => {
      state.step += 1;
    },
    startGame: (state) => {
      state.isStarted = true;
    },
    selectOperators: (state, action: PayloadAction<OperatorsEnum[]>) => {
      state.operators = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    setDifficulty: (state, action: PayloadAction<number>) => {
      state.difficulty = action.payload;
    },
    incrementSuccessStat: (state) => {
      const [success, errors] = state.statistic;
      state.statistic = [success + 1, errors];
    },
    incrementErrorStat: (state) => {
      const [success, errors] = state.statistic;
      state.statistic = [success, errors + 1];
    },
    restart: (state) => {
      state.step = initialState.step;
      state.isStarted = initialState.isStarted;
      state.statistic = initialState.statistic;
    },
  },
});

export const {
  incrementStep,
  startGame,
  selectOperators,
  incrementSuccessStat,
  incrementErrorStat,
  restart,
  setLimit,
  setDifficulty,
} = gameSlice.actions;

export default gameSlice.reducer;
