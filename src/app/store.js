import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { elearningApi } from '../features/api/apiSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [elearningApi.reducer] : elearningApi.reducer
  },
  middleware : (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(elearningApi.middleware),
});

