import { combineReducers } from "@reduxjs/toolkit";

import trainingTracker from './trackerSlice';

const rootReducer = combineReducers({
	trainingTracker,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;