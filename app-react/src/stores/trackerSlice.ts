import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk, AppDispatch } from '.';
import { SheetData } from 'common/src/types/globals';

interface TrainingState {
	data: SheetData | null;
	user: string | null;
}

const initialState: TrainingState = {
	data: null,
	user: null,
};

const trackerSlice = createSlice({
	name: 'trainingData',
	initialState,
	reducers: {
		setTrainingData(state, action: PayloadAction<SheetData>) {
			state.data = action.payload;
		},
		setUser(state, action: PayloadAction<string>) {
			state.user = action.payload;
		}
	}
});

export const { setTrainingData: setTrainingDataAction, setUser: setUserAction } =
  trackerSlice.actions;

export const setTrainingData =
  (data: SheetData): AppThunk =>
  async (dispatch: AppDispatch) => {
    dispatch(setTrainingDataAction(data));
  };

export const setUser =
  (user: string): AppThunk =>
  async (dispatch: AppDispatch) => {
    dispatch(setUserAction(user));
  };

export default trackerSlice.reducer;