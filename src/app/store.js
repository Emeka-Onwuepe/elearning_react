import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { elearningApi } from '../features/api/apiSlice';
import userslice from '../features/user/userslice';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import errorSlice from '../features/error/errorSlice';
import courseSlice from '../features/course/courseSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userslice,
    course: courseSlice,
    error: errorSlice,
    [elearningApi.reducerPath] : elearningApi.reducer
  },
  middleware : getDefaultMiddleware =>
  getDefaultMiddleware().concat([elearningApi.middleware]),
});

setupListeners(store.dispatch)