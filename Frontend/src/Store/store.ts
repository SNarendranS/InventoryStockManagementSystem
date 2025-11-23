import { configureStore } from '@reduxjs/toolkit';
import userTokenReducer from './userTokenSlice';

export const store = configureStore({
  reducer: {
    userToken: userTokenReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
