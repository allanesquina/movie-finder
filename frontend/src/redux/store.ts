import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import movieSlice from './movieSlice';

export const store = configureStore({
  reducer: {
    movie: movieSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
