import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OperatorsEnum } from 'servises/exerciseGenerator';

export interface IGameState {
  step: number;
  limit: number;
  isStarted: boolean;
  operators: OperatorsEnum[];
  statistic: [number, number];
}

const initialState: IGameState = {
  step: 1,
  limit: 3,
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

export const { incrementStep, startGame, selectOperators, incrementSuccessStat, incrementErrorStat, restart } =
  gameSlice.actions;

export default gameSlice.reducer;
